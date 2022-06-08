const functions = require('firebase-functions');
const helper = require('../helper');

exports.removeActivityArchiveConnection = functions.firestore.document('activities/{activyId}')
  .onDelete(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    let timestampDelete = Math.round(Date.now() / 1000);  

    let query = db.collection("connections").where("type", "==", "goal-activity").where("linkId", "==", snap.id);
    let querySnap = await query.get();
  
    querySnap.forEach((connectionDoc) => {
      db.collection("connections").doc(connectionDoc.id).update({ archive: true })
      let activityRemovedUpdateData = {
        type: "activity-removed",
        content: snap.id,
        createdAt: timestampDelete,
        connectionId: connectionDoc.id,
        connectionSourceId: connectionDoc.sourceId,
        connectionSourceType: connection.sourceType,
        connectionLinkId: connectionDoc.linkId,
        connectionLinkType: connection.linkType,
        connectionType: connectionDoc.type,
      };
      db.collection("updates").add(activityRemovedUpdateData)
    });
  });
