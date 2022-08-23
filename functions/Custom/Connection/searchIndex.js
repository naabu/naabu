const functions = require('firebase-functions');
const helper = require('../helper');

exports.addToIndex = functions.firestore.document('connections/{connectionId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    const data = snap.data();
    if (data.type == "goal-activity") {
      let goalId = data.sourceId;
      querySnapshot = await db.collection("connections").where("type", "==", "goal-activity").where("sourceId", "==", goalId).get();
      let numberOfActivities = querySnapshot.size;
      let modifiedAt = snap['_createTime']._seconds
      helper.goalIndex.partialUpdateObject({ numberOfActivities: numberOfActivities, modifiedAt: modifiedAt, objectID: goalId })
    }
    else if (data.type == "goal-assessment") {
      let goalId = data.sourceId;
      querySnapshot = await db.collection("connections").where("type", "==", "goal-assessment").where("sourceId", "==", goalId).get();
      let numberOfAssessments = querySnapshot.size;
      let modifiedAt = snap['_createTime']._seconds
      helper.goalIndex.partialUpdateObject({ numberOfAssessments: numberOfAssessments, modifiedAt: modifiedAt, objectID: goalId })
    }
    else if (data.type == "goal-model") {
      let goalId = data.sourceId;
      let querySnapshot = await db.collection("models").where("goalId", "==", goalId).get();
      let numberOfModels = querySnapshot.size;

      let modifiedAt = snap['_createTime']._seconds
      helper.goalIndex.partialUpdateObject({ numberOfModels: numberOfModels, modifiedAt: modifiedAt, objectID: goalId })
    }
    const objectID = snap.id;
    data.id = objectID;
    console.log({ ...data, objectID })
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
    let deletedConnection = snap.data()

    if (deletedConnection.type == "goal-activity") {

    }
    else if (deletedConnection.type == "goal-assessment") {

    }
    return helper.connectionIndex.deleteObject(snap.id);
  });
