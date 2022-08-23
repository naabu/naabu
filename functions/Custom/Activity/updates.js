const functions = require('firebase-functions');
const helper = require('../helper');

exports.updatesForConnectionCreatedActivity = functions.firestore.document('connections/{connectionId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    let connection = snap.data();
    if (connection.type === "goal-activity") {
      let activityRef = db.collection("activities").doc(connection.linkId);
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

        await db.collection("updates").add(updateData);
      }
    }
  });


  exports.updatesForConnectionEditActivity = functions.firestore.document('connections/{connectionId}')
  .onUpdate(async (change, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let previousConnection = change.before.data();
    let connection = change.after.data();
    console.log(previousConnection.status);
    console.log(connection.status);
    if (connection.type === "goal-activity" && previousConnection.status === connection.status) {
      let activityRef = db.collection("activities").doc(connection.linkId);
      let activitySnap = await activityRef.get();
      if (activitySnap.exists) {
        let activity = activitySnap.data();
        let updateData = {
          type: "activity-updated-teacher",
          activity: activity,
          authorId: connection.authorId,
          createdAt: change.after["_updateTime"].seconds,
          connectionId: change.after.id,
          connectionSourceId: connection.sourceId,
          connectionLinkId: connection.linkId,
          connectionType: connection.type,
          connectionSourceType: connection.sourceType,
          connectionLinkType: connection.linkType,
        };
        await db.collection("updates").add(updateData);
      }
    }
  });




exports.updateTitleModelKcChangedActivity = functions.firestore.document('connections/{connectionId}')
  .onUpdate(async (change, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    const connection = change.after.data();
    if (connection.type === "goal-activity") {
      const beforeConnection = change.before.data();
      if (connection.title !== beforeConnection.title) {
        let query = db.collection("models").where("linkedActivityConnectionIds", "array-contains", change.after.id);
        let querySnap = await query.get();

        querySnap.forEach(async (modelDoc) => {
          let model = modelDoc.data();
          for (let i = 0; i < model.statesKCArray.length; i++) {
            let kcState = model.statesKCArray[i];
            if (kcState.type == "kc") {
              for (let i2 = 0; i2 < kcState.activities.length; i2++) {
                let activityModelKC = kcState.activities[i2];
                if (activityModelKC.connectionId === change.after.id) {
                  model.statesKCArray[i].activities[i2].title = connection.title;
                }
              }
            }
          }
          await modelDoc.ref.set(model);
        });
      }
    }
  });

exports.updateConnectionForActivityGoal = functions.firestore.document('activities/{activityId}')
  .onUpdate(async (change, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    const oldActivity = change.before.data();
    const newActivity = change.after.data();

    if (newActivity.updateConnectionAt && (!oldActivity.updateConnectionAt || oldActivity.updateConnectionAt !== newActivity.updateConnectionAt)) {
      let query = db.collection("connections").where("type", "==", "goal-activity").where("linkId", "==", change.after.id);
      let querySnap = await query.get();

      connectionData = {
        type: "goal-activity",
        sourceId: newActivity.goalId,
        linkId: change.after.id,
        sourceType: "goal",
        linkType: "activity",
        updatedAt: change.after["_updateTime"].seconds,
        inProgressAt: change.after["_updateTime"].seconds,
        authorId: newActivity.authorId,
        title: newActivity.title,
        status: "published",
        fields: [
          {
            title: "description",
            value: newActivity.description,
          },
          {
            title: "difficulty",
            value: newActivity.difficulty,
          },
          {
            title: "type",
            value: newActivity.type,
          },
        ],
      };
      if (querySnap.size === 0) {
        db.collection("connections").add(connectionData);
      }
      else {
        querySnap.forEach(async (connectionDoc) => {
          connectionDoc.ref.set(connectionData);
        });
      }
    }
  });
