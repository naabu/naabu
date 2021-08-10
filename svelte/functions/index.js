const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');
const ENVIRONMENT = functions.config().app.environment;


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
const goalIndex = client.initIndex(goalIndexName);
const activityIndex = client.initIndex(activityIndexName);

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
            switch (feedbackData.feedbackValue){
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

exports.deleteFromGoalIndex = functions.firestore.document('goals/{goalId}')
  .onDelete((snap, context) => {
    return goalIndex.deleteObject(snap.id);
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

// - For every user (maybe even AN)
// - Make a function that checks all the users
// - If the user has not 3 activities in a path. Add activities to the path collection from Firebase.

// Trigger?
// If a new user is created? Fill path with activities?
exports.fillPathWithActivitiesForNewUsers = functions.auth.user().onCreate((user, eventContext) => {
  const fb = getFirebaseApp();
  db = fb.firestore();
  let activitiesRef = db.collection("activities");
  // TODO - maybe fix random in the future
  // https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection

  return activitiesRef.limit(3).get()
    .then((querySnapshot) => {
      let activities = [];
      querySnapshot.forEach((docSnap) => {
        let activityData = docSnap.data();
        let activityChoiceData = {
          title: activityData.title,
          type: activityData.type,
          svg: activityData.svg,
          difficulty: activityData.difficulty,
        }
        let activity = {
          id: docSnap.id,
          data: activityChoiceData,
        };
        activities.push(activity);
      });
      let pathRef = db.collection("path");
      pathRef.doc(user.uid).set({ "activities": activities}).then(() => {
        console.log('Created path succeeded!');
      });
    }).catch(err => {
      console.log(err.message)
    });
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
