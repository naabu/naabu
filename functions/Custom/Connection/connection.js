const functions = require('firebase-functions');
const helper = require('../helper');

exports.updateActivityConnectionStatus = functions.firestore.document("connections/{connectionId}")
  .onUpdate(async (change, context) => {
    const connection = change.after.data();
    if (!connection.archive && connection.type === 'goal-activity') {
      const fb = helper.getFirebaseApp();
      let db = fb.firestore();

      let ref = db.collection("activities").doc(connection.linkId);
      let activityData = {
        connectionStatus: connection.status,
        status: "open",
      }
      if (connection.status === 'published') {
        activityData.status = "published";
      }
      ref.update(activityData);
    }
  });
