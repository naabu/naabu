const functions = require('firebase-functions');
const helper = require('../helper');

exports.addToActivityIndex = functions.firestore.document('activities/{activyId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return helper.activityIndex.saveObject({ ...data, objectID });
  });

exports.updateActivityIndex = functions.firestore.document('activities/{activyId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    helper.activityIndex.saveObject({ ...newData, objectID });
    // If activity is changed. Change all similmar activies in the path collections.
    const fb = helper.getFirebaseApp();
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
    helper.activityIndex.deleteObject(snap.id);
    // Also delete it from all the paths.
    return null;
  });
