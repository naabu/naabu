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
    return null;
  });

exports.deleteFromActivityIndex = functions.firestore.document('activities/{activyId}')
  .onDelete((snap, context) => {
    helper.activityIndex.deleteObject(snap.id);
    return null;
  });
