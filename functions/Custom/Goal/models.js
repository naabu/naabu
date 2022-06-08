const functions = require('firebase-functions');
const helper = require('../helper');

exports.createConnectionModel = functions.firestore.document('models/{modelId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let model = snap.data();
    let connectionData = {
      type: "goal-model",
      sourceId: model.goalId,
      linkId: snap.id,
      sourceType: "goal",
      linkType: "model",
      updatedAt: snap['_createTime']._seconds,
      modifiedAt: snap['_createTime']._seconds,
      lastUpdatesAt: snap['_createTime']._seconds,
      authorId: model.authorId,
      title: model.title,
      fields: [
        {
          title: "description",
          value: model.description,
        },
      ],
      status: "in-progress",
    };

    await db.collection("connections").add(connectionData);
  });


exports.updateForModelConnectionCreate = functions.firestore.document('connections/{connectionId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    let connection = snap.data();

    if (connection.type === "goal-model") {
      let modelRef =  db.collection("model").doc(connection.linkId);
      let modelSnap = await modelRef.get();
      if (modelSnap.exists) {
        let model = modelSnap.data();
        let updateData = {
          type: "created-model",
          model: model,
          authorId: connection.authorId,
          createdAt: snap['_createTime']._seconds,
          connectionId: snap.id,
          connectionSourceId: connection.sourceId,
          connectionLinkId: connection.linkId,
          connectionSourceType: connection.sourceType,
          connectionLinkType: connection.linkType,
          connectionType: connection.type,
        };
  
        await db.collection("updates").add(updateData);
      }
    }
  });

