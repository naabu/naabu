const functions = require('firebase-functions');
const helper = require('../helper');

exports.scheduleExport = functions.pubsub.schedule('0 3 * * *')
  .timeZone('Europe/Amsterdam')
  .onRun((context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let triggerData = {
      lastTriggerTimestamp: Date.now()
    }
    let triggersRef = db.collection("triggers");
    triggersRef.doc('data-export').set(triggerData).then(() => {
      functions.logger.info('Exported data in data-export trigger');
    });
    return null;
  });


// Check every 6 hours...
// Check if inProgressAt time is more then X days ago?
exports.checkInProgressSchedule = functions.pubsub.schedule('0 */6 * * *')
  .onRun(async (context) => {
    console.log('Run every 6 hours');
    let daysToWorkSeconds = 2 * 86400;
    let daysToApprovalSeconds = 3 * 86400;
    let daysToSendToTrashSeconds = 100 * 86400;
    // Get all adventures that are in progress.
    // We want to check if the inProgressAt time is over X days.
    // If so we want to set the status to needs-approval
    await processStatusAutomatically(daysToWorkSeconds, daysToApprovalSeconds, daysToSendToTrashSeconds);


    return null;
  });

exports.manuallyTrigger = functions.firestore.document('/triggers/{triggerId}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) {
      return null;
    }
    let triggerId = context.params.triggerId;
    switch (triggerId) {
      case 'run-status-check':
        let daysInSeconds = 1;
        // Check if it is not in production!!
        if (helper.environment === 'development' || helper.environment === 'cypress') {
          await processStatusAutomatically(daysInSeconds, daysInSeconds, daysInSeconds);
        }
        break;
      case 'data-export':
        await dataExport();
    }
    return null;
  });

async function getGoalConnectionExport(db, goalExport, connectionName) {
  let connectionColRef = db.collection("goals").doc(goalExport.id).collection(connectionName);
  return connectionColRef.get().then((connectionQuerySnap) => {
    let i = 0;
    connectionQuerySnap.forEach((connectionSnap) => {
      let goalConnection = connectionSnap.data();
      if (goalConnection.status === 'published') {
        goalExport["goal_links_" + connectionName + "_" + i + "_id"] = goalConnection.connectionGoalId;
        i = i + 1;
      }
    });
    return goalExport;
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });
}

async function getAdventureExport(db, goalExport, adventuresExport) {
  let adventuresColRef = db.collection("goals").doc(goalExport.id).collection('adventures');
  return adventuresColRef.get().then((adventuresQuerySnap) => {
    let i = 0;
    adventuresQuerySnap.forEach((adventureSnap) => {
      let adventure = adventureSnap.data();
      if (adventure.status === 'published') {
        let adventureExport = {
          id: adventureSnap.id,
          title: adventure.title,
          goalId: goalExport.id,
        };
        adventuresExport.push(adventureExport);
      }
    });
    return adventuresExport;
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });
}

// db.collection("goals").doc(goalSnap.id).collection('adventures');
// adventuresColRef.get().then((adventuresQuerySnap) => {
//   console.log('adventure query');
//   adventuresQuerySnap.forEach((adventureSnap) => {
//     console.log('adventure snap');
//     let adventure = adventureSnap.data();
//     if (adventure.status === 'published') {
//       let adventureExport = {
//         id: adventureSnap.id,
//         title: adventure.title,
//         goalId: goalExport.id,
//       };
//       adventureExports.push(adventureExport);
//     }
//   });
//   return adventureExports;
// }).catch((error) => {
//   console.log("Error getting documents: ", error);
// });

async function dataExport() {
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();

  let goalsColRef = db.collection("goals");
  let goalsExport = await goalsColRef.get().then((goalsQuerySnap) => {
    let goals = [];
    goalsQuerySnap.forEach((goalSnap) => {
      let goal = goalSnap.data();
      let goalExport = {};
      goalExport.title = goal.title;
      goalExport.id = goalSnap.id;
      goals.push(goalExport);
    }
    );
    return goals;
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });

  let adventuresExport = [];
  for (let i = 0; i < goalsExport.length; i++) {
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'prerequisites');
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'specializations');
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'bigideas');
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'deeperunderstandings');
    adventuresExport = await getAdventureExport(db, goalsExport[i], adventuresExport);
  }

  let feedbackExport = await db.collection("feedback").get().then((querySnapshot) => {
    let feedbackExportData = [];
    querySnapshot.forEach((docSnap) => {
      let feedbackData = docSnap.data();
      if (feedbackData.adventureId) {
        let exportData = {
          adventureId: feedbackData.adventureId,
          feedbackValue: feedbackData.feedbackValue,
          time: feedbackData.time,
          uid: feedbackData.uid
        }
        switch (feedbackData.feedbackValue) {
          case -1:
            exportData.feedback = 'too-difficult';
            break;
          case -0.5:
            exportData.feedback = 'too-easy';
            break;
          case 1:
            exportData.feedback = 'just-right';
            break;
        }

        feedbackExportData.push(exportData);
      }
    });
    return feedbackExportData;

  }).catch(err => {
    functions.logger.error(err.message);
  });



  let goalsExportJson = JSON.stringify(goalsExport);
  let adventuresExportJson = JSON.stringify(adventuresExport);
  let feedbackExportJson = JSON.stringify(feedbackExport);

  let exportData = {
    adventures: adventuresExportJson,
    goals: goalsExportJson,
    feedback: feedbackExportJson,
    createdAt: Date.now()
  }

  return db.collection("dataExport").add(exportData);



  // let adventuresRef = db.collection("activities");
  // let exportData = {};
  // await activitiesRef.get()
  //   .then((querySnapshot) => {
  //     let activitiesExportData = [];
  //     querySnapshot.forEach((docSnap) => {
  //       let activityData = docSnap.data();
  //       let activityExportData = {
  //         id: docSnap.id,
  //         title: activityData.title,
  //         descriptionRaw: activityData.descriptionRaw,
  //         videoVimeoId: activityData.video.vimeoId,
  //       }
  //       if (activityData.quizzes) {
  //         for (let i = 0; i < activityData.quizzes.length; i++) {
  //           let key = 'quiz_' + i + "_";
  //           activityExportData[key + 'question'] = activityData.quizzes[i].question
  //           activityExportData[key + 'timeInVideo'] = activityData.quizzes[i].timeInVideo
  //           activityExportData[key + 'type'] = activityData.quizzes[i].type
  //           if (activityData.quizzes[i].answers) {
  //             for (let i2 = 0; i2 < activityData.quizzes[i].answers.length; i2++) {
  //               let answerKey = 'quiz_' + i + "_answer_" + i2 + "_";
  //               activityExportData[answerKey + "answer"] = activityData.quizzes[i].answers[i2].answer;
  //               activityExportData[answerKey + "correct"] = activityData.quizzes[i].answers[i2].correct;
  //             }
  //           }
  //         }
  //       }
  //       if (activityData.goals) {
  //         for (let i = 0; i < activityData.goals.length; i++) {
  //           let key = 'goal_' + i + "_";
  //           activityExportData[key + 'id'] = activityData.goals[i].objectID;
  //           activityExportData[key + 'title'] = activityData.goals[i].title
  //         }
  //       }
  //       activitiesExportData.push(activityExportData);
  //     });
  //     exportData.outputActivities = JSON.stringify(activitiesExportData);
  //   }).catch(err => {
  //     functions.logger.error(err.message);
  //   });

  // // Get the goal exports.
  // let goalsRef = db.collection("goals");
  // data = {};
  // await goalsRef.get().then((querySnapshot) => {
  //   let goalsExportData = [];
  //   querySnapshot.forEach((docSnap) => {
  //     let goalData = docSnap.data();
  //     let goalExportData = {
  //       id: docSnap.id,
  //       title: goalData.title,
  //       descriptionRaw: goalData.descriptionRaw,
  //     }
  //     if (goalData.goalLinks) {
  //       for (let i = 0; i < goalData.goalLinks.length; i++) {
  //         let key = 'goal_links_' + i + "_";
  //         goalExportData[key + 'id'] = goalData.goalLinks[i].objectID
  //         goalExportData[key + 'title'] = goalData.goalLinks[i].title
  //       }
  //     }
  //     if (goalData.taxonomy_bloom) {
  //       for (let i = 0; i < goalData.taxonomy_bloom.length; i++) {
  //         let key = 'taxonomy_bloom_' + i + "_";
  //         goalExportData[key] = goalData.taxonomy_bloom[i]
  //       }
  //     }
  //     if (goalData.taxonomy_solo) {
  //       for (let i = 0; i < goalData.taxonomy_solo.length; i++) {
  //         let key = 'taxonomy_solo_' + i + "_";
  //         goalExportData[key] = goalData.taxonomy_solo[i]
  //       }
  //     }
  //     goalsExportData.push(goalExportData);
  //   });
  //   let triggersRef = db.collection("dataExport");
  //   triggerData.output2 = JSON.stringify(goalsExportData);
  // }).catch(err => {
  //   functions.logger.error(err.message);
  // });

  // let feedbackRef = db.collection("feedback");
  // data = {};
  // await feedbackRef.get().then((querySnapshot) => {
  //   let feedbackExportData = [];
  //   querySnapshot.forEach((docSnap) => {
  //     let feedbackData = docSnap.data();
  //     let exportData = {
  //       activityId: feedbackData.activityId,
  //       feedbackValue: feedbackData.feedbackValue,
  //       time: feedbackData.time,
  //       uid: feedbackData.uid
  //     }
  //     switch (feedbackData.feedbackValue) {
  //       case -1:
  //         exportData.feedback = 'too-difficult';
  //         break;
  //       case -0.5:
  //         exportData.feedback = 'too-easy';
  //         break;
  //       case 1:
  //         exportData.feedback = 'just-right';
  //         break;
  //     }

  //     feedbackExportData.push(exportData);
  //   });
  //   triggerData.output3 = JSON.stringify(feedbackExportData);
  //   console.log(triggerData);

  // }).catch(err => {
  //   functions.logger.error(err.message);
  // });
}

async function processStatusAutomatically(secondsToProgressCheck, secondsToApproveCheck, secondsToTrashCheck) {
  let collectionToCheck = [
    'adventures',
    'prerequisites',
    'specializations',
    'bigideas',
    'deeperunderstandings',
  ]
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let currentServerTime = Date.now() / 1000;
  let goalsQuery = db.collection("goals");
  let goalsQuerySnap = await goalsQuery.get();
  goalsQuerySnap.forEach(async (goalSnap) => {
    goalSnap.ref.id;
    for (let i = 0; i < collectionToCheck.length; i++) {
      let query = goalSnap.ref.collection(collectionToCheck[i]).where("status", "==", "in-progress");
      let querySnap = await query.get();
      querySnap.forEach(async (snap) => {
        let data = snap.data();
        if (data.inProgressAt && currentServerTime - data.inProgressAt >= secondsToProgressCheck) {
          await snap.ref.update({ status: 'needs-approval', inNeedsForApprovalAt: currentServerTime });
        }
      });
      query = goalSnap.ref.collection(collectionToCheck[i]).where("status", "==", "needs-approval");
      querySnap = await query.get();
      querySnap.forEach(async (snap) => {
        let data = snap.data();
        if (data.inNeedsForApprovalAt && currentServerTime - data.inNeedsForApprovalAt >= secondsToApproveCheck) {
          await snap.ref.update({ status: 'needs-work', inNeedsWorkAt: currentServerTime });
        }
      });
      query = goalSnap.ref.collection(collectionToCheck[i]).where("status", "==", "needs-work");
      querySnap = await query.get();
      querySnap.forEach(async (snap) => {
        let data = snap.data();
        if (data.inNeedsWorkAt && currentServerTime - data.inNeedsWorkAt >= secondsToTrashCheck) {
          await snap.ref.update({ status: 'in-trash', inTrashAt: currentServerTime });
        }
      });
    }
  });
}
