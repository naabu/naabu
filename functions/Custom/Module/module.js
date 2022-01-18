const functions = require('firebase-functions');
const helper = require('../helper');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.updateUserModuleWhenModuleChanges = functions
  .runWith({
    minInstances: 1,
  })
  .firestore.document('modules/{moduleId}')
  .onUpdate(async (change, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let moduleId = context.params.moduleId;
    let userModuleColQueryRef = db.collection("modules").doc(moduleId).collection("players");
    let userModuleColQuery = await userModuleColQueryRef.get();

    let allPlayersIds = [];
    userModuleColQuery.forEach((userModuleSnap) => {
      allPlayersIds.push(userModuleSnap.id);
    });

    for (let i = 0; i < allPlayersIds.length; i++) {
      let playerId = allPlayersIds[i];
      await setModuleActivitiesForUid(playerId);
    }
    return null;
  });


exports.onModulePlayerCreated = functions
  .runWith({
    minInstances: 1,
  })
  .firestore.document('modules/{moduleId}/players/{playerId}')
  .onCreate(async (snapshot, context) => {

    if (helper.environment === 'development' || helper.environment === 'cypress' || helper.environment === 'test') {
      await sleep(5000);
    }
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let moduleRef = db.collection("modules").doc(context.params.moduleId);
    let moduleSnap = await moduleRef.get();
    if (moduleSnap.exists) {
      let module = moduleSnap.data();
      module.id = context.params.moduleId;
      await updateUserActivitiesForModule(module, context.params.playerId);
    }

    return null;
  });


async function setModuleActivitiesForUid(uid, unlock = false, locationId = null) {
  // functions.logger.log("setModuleActivitiesForUid", uid);
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let moduleColRef = db.collection("modules");
  let moduleQuery = await moduleColRef.get();

  // Get all modules for the user.
  let modulesToProcessForUser = [];
  moduleQuery.forEach((moduleSnap) => {
    let module = moduleSnap.data();
    module.id = moduleSnap.id;
    modulesToProcessForUser.push(module);
  });

  for (let i = 0; i < modulesToProcessForUser.length; i++) {
    if (modulesToProcessForUser[i].locations) {
      await updateUserActivitiesForModule(modulesToProcessForUser[i], uid, unlock, locationId);
    }
  }
}


async function updateUserActivitiesForModule(module, uid, unlock = false, locationId = null) {
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let startLocations = [];
  // console.log(module);
  for (let i2 = 0; i2 < module.locations.length; i2++) {
    if (module.locations[i2].isStartLocation) {
      startLocations.push(module.locations[i2].id);
    }
  }


  let userModuleRef = db.collection('modules').doc(module.id).collection('players').doc(uid);
  let userModuleSnap = await userModuleRef.get();

  // Default user module data.
  let userModule = {
    unlockedLocations: startLocations,
    succeededLocations: [],
    selectedAdventures: [],
    selectedActivities: [],
  }
  if (userModuleSnap.exists) {
    userModule = userModuleSnap.data();
  }

  let moduleActivities = [];
  for (let i2 = 0; i2 < module.locations.length; i2++) {
    let location = module.locations[i2];
    if (unlock && location.id === locationId) {
      console.log("unlock location", location.id);
      userModule = await unlockLocationsBasedOnNumberOfActivities(userModule, module, location.id, uid);
    }
    for (let i3 = 0; i3 < location.goals.length; i3++) {
      let goal = location.goals[i3];
      let userGoalScoreRef = db.collection("userGoalScore").where("uid", "==", uid).where("goalId", "==", goal.id);
      let userGoalScoreQuerySnap = await userGoalScoreRef.get();
      let userGoalScoreData = {
        uid: uid,
        goalId: goal.id,
        score: 1,
      };
      if (userGoalScoreQuerySnap.empty) {
        // Create a new score object with default score.
        await db.collection("userGoalScore").add(userGoalScoreData);
      }
      else {
        userGoalScoreData = userGoalScoreQuerySnap.docs[0].data();
      }


      // Get scored for each goal?
      let activitiesForGoal = await helper.getActivitiesForGoal(goal.id);
      // functions.logger.log("ActivitiesForGoals:", activitiesForGoal);
      let teaserActivities = [];
      for (let i4 = 0; i4 < activitiesForGoal.length; i4++) {
        let activity = activitiesForGoal[i4];
        let teaserActivity = {
          difficulty: activity.difficulty,
          id: activity.id,
          title: activity.title,
          type: activity.type,
          svg: activity.svg,
          goalId: activity.goalId,
        }
        teaserActivity.userGoalScore = userGoalScoreData.score;
        teaserActivity.scoreDistance = Math.abs(userGoalScoreData.score - activitiesForGoal[i4].difficulty);
        teaserActivities.push(teaserActivity);
      }
      moduleActivities = [...moduleActivities, ...teaserActivities];
    }
  }
  moduleActivities.sort((a, b) => {
    return a.scoreDistance - b.scoreDistance;
  });

  // functions.logger.log("UserModule set?:", userModule);
  if (userModule) {
    userModule.selectedActivities = moduleActivities;
    await userModuleRef.set(userModule);
    // functions.logger.log("Usermodule updated with activities", moduleActivities);
  }
}

function getAccessLocationsFromLocationId(module, locationId) {
  if (module.locations) {
    for (let i = 0; i < module.locations.length; i++) {
      let location = module.locations[i];
      if (location.id === locationId) {
        return location.accessLocations;
      }
    }
  }
  return [];
}

async function unlockLocationsBasedOnNumberOfActivities(userModule, module, locationId, uid) {
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();

  let queryRef = db.collection("feedback").where("uid", "==", uid).where("moduleId", "==", module.id).where("locationId", "==", locationId).limit(3);
  let querySnap = await queryRef.get();
  let size = querySnap.size;
  if (size >= 3) {
    let accessLocations = getAccessLocationsFromLocationId(module, locationId);
    for (let i = 0; i < accessLocations.length; i++) {
      let accessLocationId = accessLocations[i];
      if (
        !userModule.unlockedLocations.includes(accessLocationId)
      ) {
        userModule.unlockedLocations.push(accessLocationId);
        userModule.newUnlockedLocation = true;
      }
    }
  }
  return userModule;
}


exports.writeFeedbackDevelopRandom = functions
  .runWith({
    minInstances: 1,
  })
  .firestore.document('feedback/{feedbackId}')
  .onCreate(async (snap, context) => {
    if (helper.environment === 'development' || helper.environment === 'cypress' || helper.environment === 'test') {
      await sleep(5000);
    }

    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    const feedbackData = snap.data();


    // >  {
    // >    feedbackValue: 1, (-0.5, -1)
    // >    activityId: 'cAYjLuBABQs0fZOElIzL',
    // >    goalId: 'asdfasdfdsfa',
    // >    uid: '61NVW5hpYiKtuUMLqIGpfzhuDe54',
    // >    locationId: 'uu7vp',
    // >    time: 1638870298708,
    // >    moduleId: '1BmbDTdtfPAMeg65m1Mc',
    // >    feedbackType: 'difficulty'
    // >  }

    if (feedbackData.feedbackType === 'difficulty') {
      // Get the score of the learning goal.
      let userGoalScoreRef = db.collection("userGoalScore").where("uid", "==", feedbackData.uid).where("goalId", "==", feedbackData.goalId);
      let userGoalScoreQuerySnap = await userGoalScoreRef.get();
      if (!userGoalScoreQuerySnap.empty) {
        let userGoalScoreSnap = userGoalScoreQuerySnap.docs[0];
        let userGoalScoreData = userGoalScoreSnap.data();
        let score = userGoalScoreData.score
        let newScore = score;
        if (feedbackData.feedbackValue === -0.5) {
          // Too easy.
          newScore = score + 1;
          if (newScore > 5) {
            newScore = 5;
          }
        }
        else if (feedbackData.feedbackValue === 1) {
          // Just right.
          newScore = score + 0.2;
          if (newScore > 5) {
            newScore = 5;
          }
        }
        else if (feedbackData.feedbackValue === -1) {
          // Too difficult.
          newScore = score - 1;
          if (newScore < 1) {
            newScore = 1;
          }
        }
        await userGoalScoreSnap.ref.update({ score: newScore });
      }
    }
    await setModuleActivitiesForUid(feedbackData.uid, true, feedbackData.locationId);

    // let uid = feedbackData.uid;
    // let goalId = feedbackData.goalId;

    // // TODO change to activity ID.
    // let adventureId = feedbackData.adventureId;
    // const fb = helper.getFirebaseApp();
    // let db = fb.firestore();
    // let adventureRef = db.collection('goals').doc(goalId).collection('adventures').doc(adventureId);
    // let adventureSnap = await adventureRef.get();

    // if (adventureSnap.exists) {
    //   let adventure = adventureSnap.data();
    //   adventure.id = adventureId;
    //   adventure.goalId = goalId;
    //   if (adventure.type === 'boss') {
    //     console.log('Unlock locations');
    //     await unlockLocations(adventure, uid);
    //   }
    // }
    // if (helper.environment === 'development') {
    //   await setModuleActivitiesForUid(uid);
    // }
    return null;
  });

// - For every user (maybe even AN)
// - Make a function that checks all the users
// - If the user has not 3 activities in a path. Add activities to the path collection from Firebase.
// exports.fillPathWithActivitiesForNewUsers = functions
//   .runWith({
//     minInstances: 1,
//   })
//   .auth.user().onCreate(async (user, eventContext) => {
//     if (helper.environment === 'development' || helper.environment === 'cypress') {
//       await sleep(5000);
//     }
//     await setModuleActivitiesForUid(user.uid);
//     return null;
//   });
