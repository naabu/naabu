// const functions = require('firebase-functions');
// const helper = require('../helper');

// exports.onMapPlayerCreated = functions.firestore.document('maps/{mapId}/players/{playerId}')
//   .onCreate((snap, context) => {
//     setMapActivitiesForUid(context.params.playerId);
//     return null;
//   });

// async function setMapActivitiesForUid(uid) {
//   const fb = helper.getFirebaseApp();
//   let db = fb.firestore();
//   let mapColRef = db.collection("maps");
//   let mapQuery = await mapColRef.get();

//   mapQuery.forEach(async (mapSnap) => {
//     let mapId = mapSnap.id;
//     let mapData = mapSnap.data();

//     let startLocations = [];
//     for (let i = 0; i < mapData.locations.length; i++) {
//       if (mapData.locations[i].isStartLocation) {
//         startLocations.push(mapData.locations[i].id);
//       }
//     }

//     let userMapRef = db.collection('maps').doc(mapId).collection('players').doc(uid);
//     let userMapSnap = await userMapRef.get();
//     if (!userMapSnap.exists && mapId === helper.defaultMapId) {
//       userMapRef.set({
//         unlockedLocations: startLocations,
//         succeededLocations: [],
//         selectedAdventures: [],
//       });
//     }
//     let userMapData = await userMapSnap.data();
//     let mapAdventures = [];
//     for (let i = 0; i < mapData.locations.length; i++) {
//       let location = mapData.locations[i];
//       for (let i2 = 0; i2 < location.goals.length; i2++) {
//         let goal = location.goals[i2];
//         let adventureQueryRef = db.collection('goals').doc(goal.id).collection('adventures').where('status', '==', 'published');
//         let adventureQuery = await adventureQueryRef.get();
//         adventureQuery.forEach(async (adventureSnap) => {
//           let adventureData = adventureSnap.data();
//           let adventure = {
//             id: adventureSnap.ref.id,
//             goalId: goal.id,
//             title: adventureData.title,
//             type: adventureData.type,
//             svg: adventureData.svg,
//             difficulty: adventureData.difficulty,
//           }
//           mapAdventures.push(adventure);
//         });

//       }
//     }
//     helper.shuffle(mapAdventures);

//     if (userMapData) {
//       userMapRef.update({ selectedAdventures: mapAdventures });
//     }
//   });
// }

// async function unlockLocations(adventure, uid) {
//   const fb = helper.getFirebaseApp();
//   let db = fb.firestore();
//   let mapColRef = db.collection("maps");
//   let mapQuery = await mapColRef.get();
//   mapQuery.forEach(async (mapSnap) => {
//     let mapId = mapSnap.id;
//     let mapData = mapSnap.data();
//     let userMapRef = db.collection('maps').doc(mapId).collection('players').doc(uid);
//     let userMapSnap = await userMapRef.get();
//     if (userMapSnap.exists) {
//       let userMapData = await userMapSnap.data();
//       for (let i = 0; i < mapData.locations.length; i++) {
//         let location = mapData.locations[i];
//         for (let i2 = 0; i2 < location.goals.length; i2++) {
//           let goal = location.goals[i2];
//           if (goal.id === adventure.goalId) {
//             if (!userMapData.succeededLocations.includes(location.id)) {
//               userMapData.succeededLocations.push(location.id);
//             }
//             for (let i4 = 0; i4 < location.accessLocations.length; i4++) {
//               let accessLocationId = location.accessLocations[i4];
//               if (
//                 !userMapData.unlockedLocations.includes(accessLocationId)
//               ) {
//                 userMapData.unlockedLocations.push(accessLocationId);
//               }
//             }
//             userMapRef.set(userMapData);
//           }
//         }
//       }
//     }
//   });
// }

// exports.writeFeedbackDevelopRandom = functions.firestore.document('feedback/{feedbackId}')
//   .onCreate(async (snap, context) => {
//     const feedbackData = snap.data();
//     let uid = feedbackData.uid;
//     let goalId = feedbackData.goalId;
//     let adventureId = feedbackData.adventureId;
//     const fb = helper.getFirebaseApp();
//     let db = fb.firestore();
//     let adventureRef = db.collection('goals').doc(goalId).collection('adventures').doc(adventureId);
//     let adventureSnap = await adventureRef.get();
    
//     if (adventureSnap.exists) {
//       let adventure = adventureSnap.data();
//       adventure.id = adventureId;
//       adventure.goalId = goalId;
//       if (adventure.type === 'boss') {
//         console.log('Unlock locations');
//         await unlockLocations(adventure, uid);
//       }
//     }
//     if (helper.environment === 'development') {
//       await setMapActivitiesForUid(uid);
//     }
//     return null;
//   });

// // - For every user (maybe even AN)
// // - Make a function that checks all the users
// // - If the user has not 3 activities in a path. Add activities to the path collection from Firebase.
// exports.fillPathWithActivitiesForNewUsers = functions.auth.user().onCreate((user, eventContext) => {
//   setMapActivitiesForUid(user.uid);
//   return null;
// });

