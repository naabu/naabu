const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');
const ENVIRONMENT = functions.config().app.environment;
const DEFAULT_MAP_ID = functions.config().app.defaultmapid;

function getFirebaseApp() {
  const admin = require("firebase-admin");
  let firebaseApp;
  try {
    let defaultAppCheck = admin.appCheck();
    firebaseApp = defaultAppCheck.app;
  }
  catch (error) {
    firebaseApp = admin.initializeApp();
  }
  return firebaseApp;
}


let ssrServer;
exports.ssr = functions.https.onRequest(async (request, response) => {
  functions.logger.info(process.env);
  process.env.ENVIRONMENT = ENVIRONMENT;
  process.env.DEFAULT_MAP_ID = DEFAULT_MAP_ID;
  // process.env.firestore = functions.firestore;
  functions.logger.info(functions.firestore);
  if (!ssrServer) {
    process.env.fb = require('firebase');
    console.log(process.env.fb);
    functions.logger.info("Initializing SvelteKit SSR Handler");
    ssrServer = require("./ssr/index").default;
    functions.logger.info("SvelteKit SSR Handler initialised!");
  }
  functions.logger.info(process.env);
  return await ssrServer(request, response);
});

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);

function getIndex(suffix, environment) {
  let index = suffix;
  if (environment === 'development') {
    index = "dev_" + suffix;
  }
  if (environment === 'cypress') {
    index = "cypress_" + suffix;
  }
  else if (environment === 'acceptance') {
    index = "acc_" + suffix;
  }
  else if (environment === 'production') {
    index = "prod_" + suffix;
  }
  return index;
}

let goalIndexName = getIndex('goals', ENVIRONMENT);
let activityIndexName = getIndex('activities', ENVIRONMENT);
let mapIndexName = getIndex('maps', ENVIRONMENT);
const goalIndex = client.initIndex(goalIndexName);
const activityIndex = client.initIndex(activityIndexName);
const mapIndex = client.initIndex(mapIndexName);

exports.addToGoalIndex = functions.firestore.document('goals/{goalId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return goalIndex.saveObject({ ...data, objectID });
  });

exports.updateGoalIndex = functions.firestore.document('goals/{goalId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return goalIndex.saveObject({ ...newData, objectID });
  });

exports.addMapToIndex = functions.firestore.document('maps/{mapId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return mapIndex.saveObject({ ...data, objectID });
  });

exports.updateMapIndex = functions.firestore.document('maps/{mapId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return mapIndex.saveObject({ ...newData, objectID });
  });

exports.deleteMapFromIndex = functions.firestore.document('maps/{mapId}')
  .onDelete((snap, context) => {
    return mapIndex.deleteObject(snap.id);
  });

exports.scheduleExport = functions.pubsub.schedule('0 3 * * *')
  .timeZone('Europe/Amsterdam')
  .onRun((context) => {
    const fb = getFirebaseApp();
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

// Step 1. When a new feedback item is created (userid)
// Step 2. Load the user data. (activity sequence data)
// Step 3. Load all activities (ids)
// Step 4. Load the model.
// Step 5. Run the model to get all scores for all activities
// Step 6. Sort the list of activities on score (Higest on top)
// Step 7. Safe the list to the path of the user

// exports.calculateBestPath = functions.firestore.document('feedback/{feedbackId}')
//   .onCreate((snap, context) => {
//     const fb = getFirebaseApp();
//     let db = fb.firestore();
//     const data = snap.data();
//     const objectID = snap.id;
//     let feedbackRef = db.collection("feedback");
//     db.collection("feedback").where("uid", "==", data.uid).orderBy("time")
//       .get()
//       .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//               console.log(doc.id, " => ", doc.data());
//           });
//       })
//       .catch((error) => {
//           console.log("Error getting documents: ", error);
//       });
//       return null;
//   });



exports.manuallyTrigger = functions.firestore.document('/triggers/{triggerId}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) {
      return null;
    }
    let triggerId = context.params.triggerId;
    let triggerData = change.after.data();
    if (change.before.exists) {
      let beforeData = change.before.data();
      let difference = triggerData.lastTriggerTimestamp - beforeData.lastTriggerTimestamp;
      console.log(difference)
      if (difference < 5000) {
        functions.logger.info('Potential infinite loop prevented in the triggers function');
        return null;
      }
    }
    let timestampBeforeExport = Date.now();

    switch (triggerId) {
      case 'data-export':
        const fb = getFirebaseApp();
        let db = fb.firestore();
        let activitiesRef = db.collection("activities");
        let data = {};
        await activitiesRef.get()
          .then((querySnapshot) => {
            let activitiesExportData = [];
            querySnapshot.forEach((docSnap) => {
              let activityData = docSnap.data();
              let activityExportData = {
                id: docSnap.id,
                title: activityData.title,
                type: activityData.type,
                difficulty: activityData.difficulty,
                descriptionRaw: activityData.descriptionRaw,
                videoVimeoId: activityData.video.vimeoId,
              }
              if (activityData.quizzes) {
                for (let i = 0; i < activityData.quizzes.length; i++) {
                  let key = 'quiz_' + i + "_";
                  activityExportData[key + 'question'] = activityData.quizzes[i].question
                  activityExportData[key + 'timeInVideo'] = activityData.quizzes[i].timeInVideo
                  activityExportData[key + 'type'] = activityData.quizzes[i].type
                  if (activityData.quizzes[i].answers) {
                    for (let i2 = 0; i2 < activityData.quizzes[i].answers.length; i2++) {
                      let answerKey = 'quiz_' + i + "_answer_" + i2 + "_";
                      activityExportData[answerKey + "answer"] = activityData.quizzes[i].answers[i2].answer;
                      activityExportData[answerKey + "correct"] = activityData.quizzes[i].answers[i2].correct;
                    }
                  }
                }
              }
              if (activityData.goals) {
                for (let i = 0; i < activityData.goals.length; i++) {
                  let key = 'goal_' + i + "_";
                  activityExportData[key + 'id'] = activityData.goals[i].objectID;
                  activityExportData[key + 'title'] = activityData.goals[i].title
                }
              }
              activitiesExportData.push(activityExportData);
            });
            data = activitiesExportData;
            triggerData.output1 = JSON.stringify(data);
            let timestampAfterExport = Date.now();
            let differenceExportTimestamp = timestampAfterExport - timestampBeforeExport;
            if (differenceExportTimestamp > 10000) {
              functions.logger.error('Export of data is taking too long. Aborting mission!');
              return null;
            }
            // Will it trigger another onWrite?
          }).catch(err => {
            functions.logger.error(err.message);
          });

        // Get the goal exports.
        let goalsRef = db.collection("goals");
        data = {};
        await goalsRef.get().then((querySnapshot) => {
          let goalsExportData = [];
          querySnapshot.forEach((docSnap) => {
            let goalData = docSnap.data();
            let goalExportData = {
              id: docSnap.id,
              title: goalData.title,
              descriptionRaw: goalData.descriptionRaw,
            }
            if (goalData.goalLinks) {
              for (let i = 0; i < goalData.goalLinks.length; i++) {
                let key = 'goal_links_' + i + "_";
                goalExportData[key + 'id'] = goalData.goalLinks[i].objectID
                goalExportData[key + 'title'] = goalData.goalLinks[i].title
              }
            }
            if (goalData.taxonomy_bloom) {
              for (let i = 0; i < goalData.taxonomy_bloom.length; i++) {
                let key = 'taxonomy_bloom_' + i + "_";
                goalExportData[key] = goalData.taxonomy_bloom[i]
              }
            }
            if (goalData.taxonomy_solo) {
              for (let i = 0; i < goalData.taxonomy_solo.length; i++) {
                let key = 'taxonomy_solo_' + i + "_";
                goalExportData[key] = goalData.taxonomy_solo[i]
              }
            }
            goalsExportData.push(goalExportData);
          });
          let triggersRef = db.collection("triggers");
          triggerData.output2 = JSON.stringify(goalsExportData);
        }).catch(err => {
          functions.logger.error(err.message);
        });

        let timestampAfterExport = Date.now();
        let differenceExportTimestamp = timestampAfterExport - timestampBeforeExport;

        if (differenceExportTimestamp > 10000) {
          functions.logger.error('Export of data is taking too long. Aborting mission!');
          return null;
        }

        let feedbackRef = db.collection("feedback");
        data = {};
        await feedbackRef.get().then((querySnapshot) => {
          let feedbackExportData = [];
          querySnapshot.forEach((docSnap) => {
            let feedbackData = docSnap.data();
            let exportData = {
              activityId: feedbackData.activityId,
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
          });
          triggerData.output3 = JSON.stringify(feedbackExportData);
          console.log(triggerData);

        }).catch(err => {
          functions.logger.error(err.message);
        });

        timestampAfterExport = Date.now();
        differenceExportTimestamp = timestampAfterExport - timestampBeforeExport;

        if (differenceExportTimestamp > 10000) {
          functions.logger.error('Export of data is taking too long. Aborting mission!');
          return null;
        }

        let triggersRef = db.collection("triggers");
        triggersRef.doc(triggerId).set(triggerData).then(() => {
          functions.logger.info('Exported data in data-export trigger');
        });
      // Will it trigger another onWrite?

    }
    return null;
  });

// maps/OcZm1UN6gxuUiFWTgoyp/players/ZJzqHdwk3Wq5Uv3Ru6RsXCWgjp6V
exports.onMapPlayerCreated = functions.firestore.document('maps/{mapId}/players/{playerId}')
  .onCreate((snap, context) => {
    setMapActivitiesForUid(context.params.playerId);
  });

exports.deleteFromGoalIndex = functions.firestore.document('goals/{goalId}')
  .onDelete((snap, context) => {
    return goalIndex.deleteObject(snap.id);
  });

function compare(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 0;
}

function getNextAndPreviousRevisions(revisionList, revisionId) {
  revisionList.sort(compare);
  let nextRevision = null;
  let previousRevision = null;
  let previousPreviousRevision = null;
  for (let i = 0; i < revisionList.length; i++) {
    if (revisionList[i].id === revisionId) {
      if (i > 0) {
        nextRevision = revisionList[i - 1];
      }
      if (i < revisionList.length - 1) {
        previousRevision = revisionList[i + 1];
      }
      if (i < revisionList.length - 2) {
        previousPreviousRevision = revisionList[i + 2];
      }
    }
  }

  return {
    nextRevision: nextRevision,
    previousRevision: previousRevision,
    previousPreviousRevision: previousPreviousRevision
  }
}

exports.writeGoalSetTimeRevision = functions.firestore.document('revisions/{revisionId}')
  .onCreate(async (snap, context) => {
    const fb = getFirebaseApp();
    let db = fb.firestore();
    let revisionData = snap.data();
    snap.ref.update({ createdAt: snap['_createTime']._seconds })

    let goalTitle = "";


    let goalRef = db.collection("goals").doc(revisionData.goalId);
    let goalSnap = await goalRef.get();
    let objectReturnRevisions = null;
    if (goalSnap.exists) {
      let goal = goalSnap.data();
      goalTitle = goal.title;
      let revisionList = [];
      if (goal.revisionList) {
        revisionList = goal.revisionList;
      }
      revisionList.push({
        id: context.params.revisionId,
        createdAt: snap['_createTime']._seconds,
        authorId: revisionData.authorId,
        curriculumProfile: revisionData.curriculumProfile
      })
      objectReturnRevisions = getNextAndPreviousRevisions(revisionList, context.params.revisionId);
      if (objectReturnRevisions && objectReturnRevisions.previousRevision) {
        revisionList[0].previousRevisionId = objectReturnRevisions.previousRevision.id
      }
      goalRef.update({ revisionList: revisionList })
    }

    let profileRef = db.collection("curriculumProfile").doc(revisionData.authorId);
    let profileSnap = await profileRef.get();
    if (profileSnap.exists) {
      let profile = profileSnap.data();
      let revisionList = [];
      if (profile.revisionList) {
        revisionList = profile.revisionList;
      }
      let revisionToPush = {
        id: context.params.revisionId,
        createdAt: snap['_createTime']._seconds,
        goalId: revisionData.goalId,
        goalTitle: revisionData.title,
      }

      if (objectReturnRevisions && objectReturnRevisions.previousRevision) {
        revisionToPush.previousRevisionId = objectReturnRevisions.previousRevision.id
      }
      revisionList.push(revisionToPush)
      revisionList.sort(compare);
      profileRef.update({ revisionList: revisionList })
    }
    return null;
  });

exports.addToActivityIndex = functions.firestore.document('activities/{activyId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return activityIndex.saveObject({ ...data, objectID });
  });

exports.updateActivityIndex = functions.firestore.document('activities/{activyId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    activityIndex.saveObject({ ...newData, objectID });
    // If activity is changed. Change all similmar activies in the path collections.
    const fb = getFirebaseApp();
    db = fb.firestore();
    let pathRef = db.collection("path");
    let updatedActivityChoiceData = {
      title: newData.title,
      type: newData.type,
      svg: newData.svg,
      difficulty: newData.difficulty,
    }

    pathRef.where('activityIds', 'array-contains', objectID).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
          let pathData = docSnap.data();
          for (let i = 0; i < pathData.activities.length; i++) {
            if (pathData.activities[i].id === objectID) {
              pathData.activities[i].data = updatedActivityChoiceData;
            }
          }
          docSnap.ref.set(pathData);
        });
      });
    return null;
  });

exports.deleteFromActivityIndex = functions.firestore.document('activities/{activyId}')
  .onDelete((snap, context) => {
    activityIndex.deleteObject(snap.id);
    // Also delete it from all the paths.
    return null;

  });

function shuffle(array) {
  var currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function setMapActivitiesForUid(uid) {
  const fb = getFirebaseApp();
  let db = fb.firestore();
  let activities = [];
  db.collection("activities")
    .get()
    .then((activityQuerySnapshot) => {
      activityQuerySnapshot.forEach((activity_snap) => {
        activityDict = activity_snap.data();
        activityChoiceData = {
          'title': activityDict['title'],
          'type': activityDict['type'],
          'svg': activityDict['svg'],
          'difficulty': activityDict['difficulty'],
        }
        if (!activityDict['goalIds']) {
          activityDict['goalIds'] = []
        }
        activity = {
          'id': activity_snap.id,
          'data': activityChoiceData,
          'goalIds': activityDict['goalIds']
        }
        activities.push(activity);
      });
      shuffle(activities);
      db.collection("maps")
        .get()
        .then((mapsQuerySnapshot) => {
          mapsQuerySnapshot.forEach(async (map_snap) => {
            mapId = map_snap.id
            mapDict = map_snap.data();
            userMapRef = db.collection('maps').doc(mapId).collection('players').doc(uid);
            userMapRef.get().then(async (userMapSnap) => {
              userMapDict = await userMapSnap.data();
              console.log(userMapDict);
              let mapActivities = [];
              for (let i = 0; i < activities.length; i++) {
                let activity = activities[i];
                let foundInMap = false;
                activity.mapLocations = [];
                for (let i2 = 0; i2 < mapDict.locations.length; i2++) {
                  let location = mapDict.locations[i2];
                  for (let i3 = 0; i3 < location.goals.length; i3++) {
                    let goal = location.goals[i3];
                    console.log('goal');
                    console.log(goal);
                    if (activity.goalIds.includes(goal.id)) {
                      activity.mapLocations.push(location.id)
                      foundInMap = true;
                    }
                  }
                }
                if (foundInMap) {
                  mapActivities.push(activity);
                }
              }
              if (userMapDict) {
                userMapDict['selectedActivities'] = mapActivities;
                userMapRef.set(userMapDict);
              }
            });
          });
        });

    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

exports.writeFeedbackDevelopRandom = functions.firestore.document('feedback/{feedbackId}')
  .onCreate(async (snap, context) => {
    if (ENVIRONMENT === 'development') {
      const feedbackData = snap.data();
      let uid = feedbackData.uid;
      setMapActivitiesForUid(uid);
    }
    return null;

    // maps = db.collection(u'maps').stream()
    // for map in maps:
    //   mapId = map.id
    //   mapDict = map.to_dict()
    //   userMapRef = db.collection('maps').document(mapId).collection('players').document(uid)
    //   userMapSnap= userMapRef.get()
    //   if userMapSnap.exists:
    //     userMapDict = userMapSnap.to_dict();
    //     mapActivities = []
    //     for item in sorted_array:
    //       activityId = indexActivity[item[0]]
    //       for activity in activities: 
    //         if activity['id'] == activityId:
    //           foundInMap = False
    //           activity['mapLocation'] = []
    //           for location in mapDict['locations']:
    //             for goal in location['goals']:
    //               if  goal['id'] in activity['goalIds']:
    //                 activity['mapLocation'].append(location['id'])
    //                 foundInMap = True
    //           if foundInMap: 
    //             mapActivities.append(activity)
    //     userMapDict['selectedActivities'] = mapActivities
    //     userMapRef.set(userMapDict)
  });

// - For every user (maybe even AN)
// - Make a function that checks all the users
// - If the user has not 3 activities in a path. Add activities to the path collection from Firebase.

// Trigger?
// If a new user is created? Fill path with activities?
exports.fillPathWithActivitiesForNewUsers = functions.auth.user().onCreate((user, eventContext) => {
  setMapActivitiesForUid(user.uid);
  // const fb = getFirebaseApp();
  // db = fb.firestore();
  // let activitiesRef = db.collection("activities");
  // // TODO - maybe fix random in the future
  // // https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection

  // return activitiesRef.limit(3).get()
  //   .then((querySnapshot) => {
  //     let activities = [];
  //     querySnapshot.forEach((docSnap) => {
  //       let activityData = docSnap.data();
  //       let activityChoiceData = {
  //         title: activityData.title,
  //         type: activityData.type,
  //         svg: activityData.svg,
  //         difficulty: activityData.difficulty,
  //       }
  //       let activity = {
  //         id: docSnap.id,
  //         data: activityChoiceData,
  //       };
  //       activities.push(activity);
  //     });
  //     let pathRef = db.collection("path");
  //     pathRef.doc(user.uid).set({ "activities": activities }).then(() => {
  //       console.log('Created path succeeded!');
  //     });
  //   }).catch(err => {
  //     console.log(err.message)
  //   });
});

// If an activity is removed from the path
// exports.fillPathWithActivitiesWhenActivityIsDeletedFromPath = functions.firestore.document('path/{pathId}')
//   .onUpdate((snap, context) => {
//     // Check the amount of activities for the user?
//     // If lower than x.
//     // Then fill.
//   });

// If the path has less than 3 activities?

// If a user finished / skipped an activity? Fill the path.
// Maybe if the user did something releveant to the algorithm. Update the path.
