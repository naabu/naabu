const functions = require('firebase-functions');
const helper = require('../helper');

exports.updateUserModuleWhenModuleChanges = functions.firestore.document('modules/{moduleId}')
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

    console.log(allPlayersIds);

    for (let i = 0; i < allPlayersIds.length; i++) {
      let playerId = allPlayersIds[i];
      await setModuleActivitiesForUid(playerId);
    }
    return null;
  });


exports.onModulePlayerCreated = functions.firestore.document('modules/{moduleId}/players/{playerId}')
  .onCreate((snap, context) => {
    setModuleActivitiesForUid(context.params.playerId);
    return null;
  });

async function setModuleActivitiesForUid(uid) {
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
    let module = modulesToProcessForUser[i];
    let startLocations = [];
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
    if (!userModuleSnap.exists) {
      await userModuleRef.set(userModule);
    }
    else {
      userModule = userModuleSnap.data();
    }

    let moduleActivities = [];
    for (let i2 = 0; i2 < module.locations.length; i2++) {
      let location = module.locations[i2];
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

    if (userModule) {
      userModuleRef.update({ selectedActivities: moduleActivities });
    }
  }
}

async function unlockLocations(adventure, uid) {
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let moduleColRef = db.collection("modules");
  let moduleQuery = await moduleColRef.get();
  moduleQuery.forEach(async (moduleSnap) => {
    let moduleId = moduleSnap.id;
    let moduleData = moduleSnap.data();
    let userModuleRef = db.collection('modules').doc(moduleId).collection('players').doc(uid);
    let userModuleSnap = await userModuleRef.get();
    if (userModuleSnap.exists) {
      let userModuleData = await userModuleSnap.data();
      for (let i = 0; i < moduleData.locations.length; i++) {
        let location = moduleData.locations[i];
        for (let i2 = 0; i2 < location.goals.length; i2++) {
          let goal = location.goals[i2];
          if (goal.id === adventure.goalId) {
            if (!userModuleData.succeededLocations.includes(location.id)) {
              userModuleData.succeededLocations.push(location.id);
            }
            for (let i4 = 0; i4 < location.accessLocations.length; i4++) {
              let accessLocationId = location.accessLocations[i4];
              if (
                !userModuleData.unlockedLocations.includes(accessLocationId)
              ) {
                userModuleData.unlockedLocations.push(accessLocationId);
              }
            }
            userModuleRef.set(userModuleData);
          }
        }
      }
    }
  });
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

async function unlockLocationsBasedOnNumberOfActivities(moduleId, locationId, uid) {
  console.log(moduleId);
  console.log(locationId);
  console.log(uid);
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();

  let moduleRef = db.collection("modules").doc(moduleId);
  let moduleSnap = await moduleRef.get();

  if (moduleSnap.exists) {
    let module = moduleSnap.data();
    module.id = moduleSnap.id;

    let userModuleRef = db.collection('modules').doc(moduleId).collection('players').doc(uid);
    let userModuleSnap = await userModuleRef.get();
    if (userModuleSnap.exists) {
      let userModule = userModuleSnap.data();
      userModule.id = userModuleSnap.id;

      let queryRef = db.collection("feedback").where("uid", "==", uid).where("moduleId", "==", moduleId).where("locationId", "==", locationId);
      let querySnap = await queryRef.get();
      let size = querySnap.size;
      console.log("size: " + size);
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
    
      userModuleRef.set(userModule);
    }
  }

}

exports.writeFeedbackDevelopRandom = functions.firestore.document('feedback/{feedbackId}')
  .onCreate(async (snap, context) => {
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
          console.log("Too easy");
          // Too easy.
          newScore = score + 1;
          if (newScore > 5) {
            newScore = 5;
          }
        }
        else if (feedbackData.feedbackValue === 1) {
          console.log("Just right");
          // Just right.
          newScore = score + 0.2;
          if (newScore > 5) {
            newScore = 5;
          }
        }
        else if (feedbackData.feedbackValue === -1) {
          console.log("Too difficult");
          // Too difficult.
          newScore = score - 1;
          if (newScore < 1) {
            newScore = 1;
          }
        }
        await userGoalScoreSnap.ref.update({ score: newScore });
      }
    }

    await setModuleActivitiesForUid(feedbackData.uid);

    await unlockLocationsBasedOnNumberOfActivities(feedbackData.moduleId, feedbackData.locationId, feedbackData.uid);
    // Do a query.


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
exports.fillPathWithActivitiesForNewUsers = functions.auth.user().onCreate((user, eventContext) => {
  setModuleActivitiesForUid(user.uid);
  return null;
});
