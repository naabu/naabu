const functions = require('firebase-functions');
const helper = require('../helper');

exports.updatesForConnectionCreatedActivity = functions.firestore.document('connections/{connectionId}')
  .onCreate(async (snap, context) => {
    console.log("function is called!");
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    let connection = snap.data();
    
    console.log(connection);
    if (connection.type === "goal-activity") {
      let activityRef =  db.collection("activities").doc(connection.linkId);
      let activitySnap = await activityRef.get();
      if (activitySnap.exists) {
        let activity = activitySnap.data();
        let updateData = {
          type: "created-activity-teacher",
          activity: activity,
          authorId: connection.authorId,
          createdAt: snap['_createTime']._seconds,
          connectionId: snap.id,
          connectionSourceId: connection.sourceId,
          connectionLinkId: connection.linkId,
          connectionSourceType: connection.sourceType,
          connectionLinkType: connection.linkType,
          connectionType: connection.type,
        };
        console.log(updateData);
  
        await db.collection("updates").add(updateData);
      }
    }
  });
