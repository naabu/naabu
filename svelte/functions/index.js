const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require('algoliasearch');
const ENVIRONMENT = functions.config().app.environment;


function getFirebaseApp() {
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
.onCreate((snap, context)  => {
  const data = snap.data();
  const objectID = snap.id;
  return goalIndex.saveObject({... data, objectID});
});

exports.updateGoalIndex = functions.firestore.document('goals/{goalId}')
.onUpdate((change, context) => {
  const newData = change.after.data();
  const objectID = change.after.id;
  return goalIndex.saveObject({... newData, objectID});
});

exports.manuallyTrigger = functions.firestore.document('/triggers/{triggerId}')
    .onWrite((change, context) => {
      if (!change.after.exists) {
        return null;
      }
      let triggerId = context.params.triggerId;
      let triggerData = change.after.data();
      if (change.before.exists) {
        let beforeData = change.before.data();
        let difference = triggerData.lastTriggerTimestamp - beforeData.lastTriggerTimestamp;
        if (difference < 60000) {
          functions.logger.info('Potential infinite loop prevented in the triggers function');
          return null;
        }
      }
      let timestampBeforeExport = Date.now();

      switch(triggerId) {
        case 'data-export':
          const fb = getFirebaseApp();
          let db = fb.firestore();
          let activitiesRef = db.collection("activities");
          let data = {};
          return activitiesRef.get()
            .then((querySnapshot) => {
              let activitiesExportData = [];
              querySnapshot.forEach((docSnap) => {
                let activityData = docSnap.data();
                let activityExportData = {
                  id: docSnap.id,
                  title: activityData.title,
                  type: activityData.type,
                  difficulty: activityData.difficulty,
                  descriptionRaw : activityData.descriptionRaw,
                  videoVimeoId: activityData.video.vimeoId,
                }
                if (activityData.quizzes) {
                  for (let i = 0; i < activityData.quizzes.length; i++) {
                    let key = 'quiz_' + i + "_";
                    activityExportData[key + 'question'] = activityData.quizzes[i].quistion
                    activityExportData[key + 'timeInVideo'] = activityData.quizzes[i].timeInVideo
                    activityExportData[key + 'type'] = activityData.quizzes[i].type
                    if (activityData.quizzes[i].answers) {
                      for (let i2 = 0; i2 < activityData.quizzes[i].answers.length; i2++) {
                        let answerKey = 'quiz_' + i + "_answer_" + i2 + "_";
                        activityExportData[answerKey+ "answer"] = activityData.quizzes[i].answers[i2].answer;
                        activityExportData[answerKey+ "correct"] = activityData.quizzes[i].answers[i2].correct;
                      }
                    }
                  }
                }
                activitiesExportData.push(activityExportData);
              });
              data.activity = activitiesExportData;
              let triggersRef = db.collection("triggers");
              triggerData.output = JSON.stringify(data);
              let timestampAfterExport = Date.now();
              let differenceExportTimestamp = timestampAfterExport - timestampBeforeExport;
              if (differenceExportTimestamp > 50000) {
                functions.logger.error('Export of data is taking too long. Aborting mission!');
                return null;
              }
              triggersRef.doc(triggerId).set(triggerData).then(() => {
                functions.logger.info('Exported data in data-export trigger');
              });
              // Will it trigger another onWrite?
            }).catch(err => {
              functions.logger.error(err.message);
            });
      }
    return null;
});

exports.deleteFromGoalIndex = functions.firestore.document('goals/{goalId}')
.onDelete((snap, context) => {
  return goalIndex.deleteObject(snap.id);
});

exports.addToActivityIndex = functions.firestore.document('activities/{activyId}')
.onCreate((snap, context)  => {
  const data = snap.data();
  const objectID = snap.id;
  return activityIndex.saveObject({... data, objectID});
});

exports.updateActivityIndex = functions.firestore.document('activities/{activyId}')
.onUpdate((change, context) => {
  const newData = change.after.data();
  const objectID = change.after.id;
  activityIndex.saveObject({... newData, objectID});
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
      let activityIds = [];
      // Not smart piece of code yet!
      // Want to have a smart algorithm retrieve the best activities.
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
        activityIds.push(docSnap.id);
      });
      let pathRef = db.collection("path");
      pathRef.doc(user.uid).set({"activities": activities, 'activityIds' : activityIds}).then(() => {
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
