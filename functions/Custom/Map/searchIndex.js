const functions = require('firebase-functions');
const helper = require('../helper');

exports.addMapToIndex = functions.firestore.document('maps/{mapId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return helper.mapIndex.saveObject({ ...data, objectID });
  });

exports.updateMapIndex = functions.firestore.document('maps/{mapId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return helper.mapIndex.saveObject({ ...newData, objectID });
  });

exports.deleteMapFromIndex = functions.firestore.document('maps/{mapId}')
  .onDelete((snap, context) => {
    return helper.mapIndex.deleteObject(snap.id);
  });