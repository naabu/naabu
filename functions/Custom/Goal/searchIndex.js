const functions = require('firebase-functions');
const helper = require('../helper');

exports.addToIndex = functions.firestore.document('goals/{goalId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    data.numberOfModels = 0;
    data.numberOfActivities = 0;
    data.numberOfAssessment = 0;

    const objectID = snap.id;
    return helper.goalIndex.saveObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore.document('goals/{goalId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return helper.goalIndex.saveObject({ ...newData, objectID });
  });

  exports.deleteIndex = functions.firestore.document('goals/{goalId}')
  .onDelete((snap, context) => {
    return helper.goalIndex.deleteObject(snap.id);
  });
  