const functions = require('firebase-functions');
const helper = require('../helper');

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

  moduleQuery.forEach(async (moduleSnap) => {
    let moduleId = moduleSnap.id;
    let moduleData = moduleSnap.data();

    let startLocations = [];
    for (let i = 0; i < moduleData.locations.length; i++) {
      if (moduleData.locations[i].isStartLocation) {
        startLocations.push(moduleData.locations[i].id);
      }
    }

    let userModuleRef = db.collection('modules').doc(moduleId).collection('players').doc(uid);
    let userModuleSnap = await userModuleRef.get();
    if (!userModuleSnap.exists && moduleId === helper.defaultModuleId) {
      userModuleRef.set({
        unlockedLocations: startLocations,
        succeededLocations: [],
        selectedAdventures: [],
        selectedActivities: [],
      });
    }
    let userModuleData = await userModuleSnap.data();
    let moduleActivities = [];
    for (let i = 0; i < moduleData.locations.length; i++) {
      let location = moduleData.locations[i];
      for (let i2 = 0; i2 < location.goals.length; i2++) {
        let goal = location.goals[i2];
        let activitiesForGoal = await helper.getActivitiesForGoal(goal.id);
        moduleActivities = [...moduleActivities, ...activitiesForGoal];
      }
    }
    helper.shuffle(moduleActivities);
    if (userModuleData) {
      userModuleRef.update({ selectedActivities: moduleActivities });
    }
  });
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

exports.writeFeedbackDevelopRandom = functions.firestore.document('feedback/{feedbackId}')
  .onCreate(async (snap, context) => {
    const feedbackData = snap.data();
    let uid = feedbackData.uid;
    let goalId = feedbackData.goalId;
    let adventureId = feedbackData.adventureId;
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let adventureRef = db.collection('goals').doc(goalId).collection('adventures').doc(adventureId);
    let adventureSnap = await adventureRef.get();
    
    if (adventureSnap.exists) {
      let adventure = adventureSnap.data();
      adventure.id = adventureId;
      adventure.goalId = goalId;
      if (adventure.type === 'boss') {
        console.log('Unlock locations');
        await unlockLocations(adventure, uid);
      }
    }
    if (helper.environment === 'development') {
      await setModuleActivitiesForUid(uid);
    }
    return null;
  });

// - For every user (maybe even AN)
// - Make a function that checks all the users
// - If the user has not 3 activities in a path. Add activities to the path collection from Firebase.
exports.fillPathWithActivitiesForNewUsers = functions.auth.user().onCreate((user, eventContext) => {
  setModuleActivitiesForUid(user.uid);
  return null;
});

