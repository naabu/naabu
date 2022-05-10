const functions = require('firebase-functions');
const helper = require('../helper');

exports.addToIndex = functions.firestore.document('connections/{connectionId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    data.id = objectID;
    return helper.connectionIndex.saveObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore.document('connections/{connectionId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    newData.id = objectID;
    return helper.connectionIndex.saveObject({ ...newData, objectID });
  });

  exports.deleteIndex = functions.firestore.document('connections/{connectionId}')
  .onDelete((snap, context) => {
    return helper.connectionIndex.deleteObject(snap.id);
  });
  