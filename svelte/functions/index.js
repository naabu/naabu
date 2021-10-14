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
      case 'run-status-check':
        let daysInSeconds = 1;
        // Check if it is not in production!!
        if (ENVIRONMENT === 'development' || ENVIRONMENT === 'cypress') {
          await processStatusAutomatically(daysInSeconds, daysInSeconds, daysInSeconds);
        }
        break;
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

function compareLastReplyAt(a, b) {
  if (a.lastReplyAt < b.lastReplyAt) {
    return 1;
  }
  if (a.lastReplyAt > b.lastReplyAt) {
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


exports.onCreatePost = functions.firestore.document('talk/{talkId}/posts/{postId}')
  .onCreate(async (snap, context) => {
    snap.ref.update({
      createdAt: snap['_createTime']._seconds,
      modifiedAt: snap['_createTime']._seconds,
      lastReplyAt: snap['_createTime']._seconds,
    });
    if (snap.exists) {
      const fb = getFirebaseApp();
      let db = fb.firestore();

      let postData = snap.data();
      let goal;

      let query = db.collection("goals").where("talkId", "==", context.params.talkId).limit(1);
      let querySnap = await query.get();
      querySnap.forEach((goalDoc) => {
        let goalData = goalDoc.data();
        goal = {};
        goal.title = goalData.title;
        goal.id = goalDoc.id;
      });


      let profileRef = db.collection("curriculumProfile").doc(postData.authorId);
      let profileSnap = await profileRef.get();
      if (profileSnap.exists && goal) {
        let profile = profileSnap.data();
        let postList = [];
        if (profile.postList) {
          postList = profile.postList;
        }
        let postToPush = {
          talkId: context.params.talkId,
          postId: context.params.postId,
          createdAt: snap['_createTime']._seconds,
          postTitle: postData.title,
          goalId: goal.id,
          goalTitle: goal.title,
          type: 'post'
        }
        postList.push(postToPush)
        postList.sort(compareLastReplyAt);
        profileRef.update({ postList: postList })
      }
    }
    return null;
  });

exports.onCreateReply = functions.firestore.document('talk/{talkId}/posts/{postId}/replies/{replyId}')
  .onCreate(async (snap, context) => {
    snap.ref.update({ createdAt: snap['_createTime']._seconds });
    const fb = getFirebaseApp();
    let db = fb.firestore();

    let postRef = db.collection('talk').doc(context.params.talkId).collection('posts').doc(context.params.postId);
    await postRef.update({ lastReplyAt: snap['_createTime']._seconds });

    if (snap.exists) {
      const fb = getFirebaseApp();
      let db = fb.firestore();
      let replyData = snap.data();
      let goal;

      let query = db.collection("goals").where("talkId", "==", context.params.talkId).limit(1);
      let querySnap = await query.get();
      querySnap.forEach((goalDoc) => {
        let goalData = goalDoc.data();
        goal = {};
        goal.title = goalData.title;
        goal.id = goalDoc.id;
      });

      let profileRef = db.collection("curriculumProfile").doc(replyData.authorId);
      let profileSnap = await profileRef.get();
      if (profileSnap.exists && goal) {
        let profile = profileSnap.data();
        let postList = [];
        if (profile.postList) {
          postList = profile.postList;
        }
        let replyToPush = {
          talkId: context.params.talkId,
          postId: context.params.postId,
          replyId: context.params.replyId,
          createdAt: snap['_createTime']._seconds,
          replyText: replyData.text,
          goalId: goal.id,
          goalTitle: goal.title,
          type: 'reply'
        }
        console.log(replyToPush);
        postList.push(replyToPush)
        postList.sort(compare);
        profileRef.update({ postList: postList })
      }
    }

    return null;
  });

function setArrayAdventure(adventuresArray, adventure, isDeleted = false) {
  if (!adventuresArray) {
    adventuresArray = [];
  }
  let index = adventuresArray.findIndex(a => a.id === adventure.id);
  if (isDeleted) {
    if (index !== -1) {
      adventuresArray.splice(index, 1);
    }
  }
  else {
    if (!adventure.inNeedsWorkAt) {
      adventure.inNeedsWorkAt = adventure.lastUpdatesAt;
    }
    if (!adventure.inProgressAt) {
      adventure.inProgressAt = adventure.lastUpdatesAt;
    }
    if (!adventure.inNeedsForApprovalAt) {
      adventure.inNeedsForApprovalAt = adventure.lastUpdatesAt;
    }
    let changedAdventure = {
      id: adventure.id,
      difficulty: adventure.difficulty,
      type: adventure.type,
      svg: adventure.svg,
      title: adventure.title,
      status: adventure.status,
      createdAt: adventure.createdAt,
      modifiedAt: adventure.modifiedAt,
      lastUpdatesAt: adventure.lastUpdatesAt,
      inNeedsWorkAt: adventure.inNeedsWorkAt,
      inProgressAt: adventure.inProgressAt,
      inNeedsForApprovalAt: adventure.inNeedsForApprovalAt,
    }
    if (index !== -1) {
      adventuresArray[index] = changedAdventure;
    }
    else {
      adventuresArray.push(changedAdventure);
    }
  }
  return adventuresArray;
}

async function processStatusAutomatically(secondsToProgressCheck, secondsToApproveCheck, secondsToTrashCheck) {
  let collectionToCheck = [
    'adventures',
    'prerequisites',
    'specializations',
    'bigideas',
    'deeperunderstandings',
  ]
  const fb = getFirebaseApp();
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

function setArrayConnection(connectionArray, connection, isDeleted = false) {
  if (!connectionArray) {
    connectionArray = [];
  }
  let index = connectionArray.findIndex(a => a.id === connection.id);
  if (isDeleted) {
    if (index !== -1) {
      connectionArray.splice(index, 1);
    }
  }
  else {
    if (!connection.inNeedsWorkAt) {
      connection.inNeedsWorkAt = connection.lastUpdatesAt;
    }
    if (!connection.inProgressAt) {
      connection.inProgressAt = connection.lastUpdatesAt;
    }
    if (!connection.inNeedsForApprovalAt) {
      connection.inNeedsForApprovalAt = connection.lastUpdatesAt;
    }
    let changedConnection = {
      id: connection.id,
      connectionDescription: connection.connectionDescription,
      description: connection.description,
      title: connection.title,
      status: connection.status,
      createdAt: connection.createdAt,
      modifiedAt: connection.modifiedAt,
      lastUpdatesAt: connection.lastUpdatesAt,
      inNeedsWorkAt: connection.inNeedsWorkAt,
      inProgressAt: connection.inProgressAt,
      inNeedsForApprovalAt: connection.inNeedsForApprovalAt,
    }

    if (index !== -1) {
      connectionArray[index] = changedConnection;
    }
    else {
      connectionArray.push(changedConnection);
    }
  }
  return connectionArray;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function handleConnectionLists(change, context, connectionType) {
  let isDeleted = false;
  let connection;
  if (!change.after.exists) {
    isDeleted = true;
    connection = change.before.data();
    connection.id = change.before.ref.id;
  }
  else {
    connection = change.after.data();
    connection.id = change.after.ref.id;
  }

  let arrayNames = [
    'published' + capitalizeFirstLetter(connectionType),
    'needsApproval' + capitalizeFirstLetter(connectionType),
    'inProgress' + capitalizeFirstLetter(connectionType),
    'needsWork' + capitalizeFirstLetter(connectionType),
    'trashCan' + capitalizeFirstLetter(connectionType),
  ]

  const fb = getFirebaseApp();
  let db = fb.firestore();
  let goalRef = db.collection("goals").doc(context.params.goalId);
  let goalSnap = await goalRef.get();
  if (goalSnap.exists) {
    let goal = goalSnap.data();
    for (let i = 0; i < arrayNames.length; i++) {
      let arrayName = arrayNames[i]
      if (!goal[arrayName]) {
        goal[arrayName] = [];
      }
    }
    let allConnections = [...goal[arrayNames[0]], ...goal[arrayNames[1]], ...goal[arrayNames[2]], ...goal[arrayNames[3]], ...goal[arrayNames[4]]];

    allConnections = [...new Map(allConnections.map(item =>
      [item['id'], item])).values()];

    setArrayConnection(allConnections, connection, isDeleted);

    goal[arrayNames[0]] = [];
    goal[arrayNames[1]] = [];
    goal[arrayNames[2]] = [];
    goal[arrayNames[3]] = [];
    goal[arrayNames[4]] = [];

    let idsAdded = [];
    for (let i = 0; i < allConnections.length; i++) {
      let theConnection = allConnections[i];
      if (!idsAdded.includes(theConnection.id)) {
        idsAdded.push(theConnection.id);
        switch (theConnection.status) {
          case 'published':
            goal[arrayNames[0]].push(theConnection);
            break;
          case 'needs-approval':
            goal[arrayNames[1]].push(theConnection);
            break;
          case 'in-progress':
            goal[arrayNames[2]].push(theConnection);
            break;
          case 'needs-work':
            goal[arrayNames[3]].push(theConnection);
            break;
          case 'in-trash':
            goal[arrayNames[4]].push(theConnection);
            break;
        }
      }
      else {
        console.log('duplicate id detected');
      }
    }

    let updateObject = {};
    updateObject[arrayNames[0]] = goal[arrayNames[0]];
    updateObject[arrayNames[1]] = goal[arrayNames[1]];
    updateObject[arrayNames[2]] = goal[arrayNames[2]];
    updateObject[arrayNames[3]] = goal[arrayNames[3]];
    updateObject[arrayNames[4]] = goal[arrayNames[4]];
    await goalRef.update(updateObject);
  }
}

exports.createGoalPrerequisitsLists = functions.firestore.document("goals/{goalId}/prerequisites/{prerequisiteId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'prerequisites');
  });

exports.createGoaSpecializationLists = functions.firestore.document("goals/{goalId}/specializations/{specializationId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'specializations');
  });

exports.createGoalBigIdeasLists = functions.firestore.document("goals/{goalId}/bigideas/{bigideaId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'bigideas');
  });

exports.createGoalDeeperUnderstandingLists = functions.firestore.document("goals/{goalId}/deeperunderstandings/{deeperunderstandingId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'deeperunderstandings');
  });

exports.createGoalAdventureLists = functions.firestore.document("goals/{goalId}/adventures/{adventureId}")
  .onWrite(async (change, context) => {
    let isDeleted = false;
    let adventure;
    if (!change.after.exists) {
      isDeleted = true;
      adventure = change.before.data();
      adventure.id = change.before.ref.id;
    }
    else {
      adventure = change.after.data();
      adventure.id = change.after.ref.id;
    }


    const fb = getFirebaseApp();
    let db = fb.firestore();
    let goalRef = db.collection("goals").doc(context.params.goalId);
    let goalSnap = await goalRef.get();
    if (goalSnap.exists) {
      let goal = goalSnap.data();

      if (!goal.publishedAdventures) {
        goal.publishedAdventures = [];
      }
      if (!goal.needsApprovalAdventures) {
        goal.needsApprovalAdventures = [];
      }
      if (!goal.inProgressAdventures) {
        goal.inProgressAdventures = [];
      }
      if (!goal.needsWorkAdventures) {
        goal.needsWorkAdventures = [];
      }
      if (!goal.trashCanAdventures) {
        goal.trashCanAdventures = [];
      }

      let allAdventures = [...goal.publishedAdventures, ...goal.needsApprovalAdventures, ...goal.inProgressAdventures, ...goal.needsWorkAdventures, ...goal.trashCanAdventures];

      // allAdventures Make unique distinct on ID
      // allAdventures.map(a => a.id)
      //   .filter((value, index, self) => self.indexOf(value) === index);
      // allAdventures.filter((value, index, self) => self.map(a => a.id).indexOf(value.id) == index)

      allAdventures = [...new Map(allAdventures.map(item =>
        [item['id'], item])).values()];
      setArrayAdventure(allAdventures, adventure, isDeleted);

      goal.publishedAdventures = [];
      goal.needsApprovalAdventures = [];
      goal.inProgressAdventures = [];
      goal.needsWorkAdventures = [];
      goal.trashCanAdventures = [];
      let idsAdded = [];
      for (let i = 0; i < allAdventures.length; i++) {
        let theAdventure = allAdventures[i];
        if (!idsAdded.includes(theAdventure.id)) {
          idsAdded.push(theAdventure.id);
          switch (theAdventure.status) {
            case 'published':
              goal.publishedAdventures.push(theAdventure);
              break;
            case 'needs-approval':
              goal.needsApprovalAdventures.push(theAdventure);
              break;
            case 'in-progress':
              goal.inProgressAdventures.push(theAdventure);
              break;
            case 'needs-work':
              goal.needsWorkAdventures.push(theAdventure);
              break;
            case 'in-trash':
              goal.trashCanAdventures.push(theAdventure);
              break;
          }
        }
        else {
          console.log('duplicate id detected');
        }
      }

      await goalRef.update({
        publishedAdventures: goal.publishedAdventures,
        needsApprovalAdventures: goal.needsApprovalAdventures,
        inProgressAdventures: goal.inProgressAdventures,
        needsWorkAdventures: goal.needsWorkAdventures,
        trashCanAdventures: goal.trashCanAdventures
      });
    }
    return null;
  });

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

async function setMapActivitiesForUid(uid) {
  const fb = getFirebaseApp();
  let db = fb.firestore();
  let mapColRef = db.collection("maps");
  let mapQuery = await mapColRef.get();

  mapQuery.forEach(async (mapSnap) => {
    let mapId = mapSnap.id;
    let mapData = mapSnap.data();
    let userMapRef = db.collection('maps').doc(mapId).collection('players').doc(uid);
    let userMapSnap = await userMapRef.get();
    let userMapData = await userMapSnap.data();
    let mapAdventures = [];
    for (let i = 0; i < mapData.locations.length; i++) {
      let location = mapData.locations[i];
      for (let i2 = 0; i2 < location.goals.length; i2++) {
        let goal = location.goals[i2];
        let adventureQueryRef = db.collection('goals').doc(goal.id).collection('adventures').where('status', '==', 'published');
        let adventureQuery = await adventureQueryRef.get();
        adventureQuery.forEach(async (adventureSnap) => {
          let adventureData = adventureSnap.data();
          let adventure = {
            id: adventureSnap.ref.id,
            goalId: goal.id,
            title: adventureData.title,
            type: adventureData.type,
            svg: adventureData.svg,
            difficulty: adventureData.difficulty,
          }


          mapAdventures.push(adventure);
        });

      }
    }
    shuffle(mapAdventures);

    if (userMapData) {
      userMapRef.update({ selectedAdventures: mapAdventures });
    }
  });

  // let activities = [];
  // db.collection("activities")
  //   .get()
  //   .then((activityQuerySnapshot) => {
  //     activityQuerySnapshot.forEach((activity_snap) => {
  //       activityDict = activity_snap.data();
  //       activityChoiceData = {
  //         'title': activityDict['title'],
  //         'type': activityDict['type'],
  //         'svg': activityDict['svg'],
  //         'difficulty': activityDict['difficulty'],
  //       }
  //       if (!activityDict['goalIds']) {
  //         activityDict['goalIds'] = []
  //       }
  //       activity = {
  //         'id': activity_snap.id,
  //         'data': activityChoiceData,
  //         'goalIds': activityDict['goalIds']
  //       }
  //       activities.push(activity);
  //     });
  //     shuffle(activities);
  //     db.collection("maps")
  //       .get()
  //       .then((mapsQuerySnapshot) => {
  //         mapsQuerySnapshot.forEach(async (map_snap) => {
  //           mapId = map_snap.id
  //           mapDict = map_snap.data();
  //           userMapRef = db.collection('maps').doc(mapId).collection('players').doc(uid);
  //           userMapRef.get().then(async (userMapSnap) => {
  //             userMapDict = await userMapSnap.data();
  //             console.log(userMapDict);
  //             let mapActivities = [];
  //             for (let i = 0; i < activities.length; i++) {
  //               let activity = activities[i];
  //               let foundInMap = false;
  //               activity.mapLocations = [];
  //               for (let i2 = 0; i2 < mapDict.locations.length; i2++) {
  //                 let location = mapDict.locations[i2];
  //                 for (let i3 = 0; i3 < location.goals.length; i3++) {
  //                   let goal = location.goals[i3];
  //                   console.log('goal');
  //                   console.log(goal);
  //                   if (activity.goalIds.includes(goal.id)) {
  //                     activity.mapLocations.push(location.id)
  //                     foundInMap = true;
  //                   }
  //                 }
  //               }
  //               if (foundInMap) {
  //                 mapActivities.push(activity);
  //               }
  //             }
  //             if (userMapDict) {
  //               userMapDict['selectedActivities'] = mapActivities;
  //               userMapRef.set(userMapDict);
  //             }
  //           });
  //         });
  //       });

  //   })
  //   .catch((error) => {
  //     console.log("Error getting documents: ", error);
  //   });
}

exports.writeFeedbackDevelopRandom = functions.firestore.document('feedback/{feedbackId}')
  .onCreate(async (snap, context) => {
    if (ENVIRONMENT === 'development') {
      const feedbackData = snap.data();
      let uid = feedbackData.uid;
      await setMapActivitiesForUid(uid);
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
