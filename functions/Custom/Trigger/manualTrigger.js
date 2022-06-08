const functions = require('firebase-functions');
const helper = require('../helper');
const exportData = require('./exportData');
const connectionUpdate = require('../Connection/connectionUpdate');

exports.manuallyTrigger = functions.firestore.document('/triggers/{triggerId}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) {
      return null;
    }
    let triggerId = context.params.triggerId;
    switch (triggerId) {
      case 'run-status-check':
        let daysInSeconds = 1;
        // Check if it is not in production!!
        if (helper.environment === 'development' || helper.environment === 'cypress' || helper.environment === 'test') {
          await connectionUpdate.processStatusConnection(daysInSeconds, daysInSeconds, daysInSeconds);
        }
        break;
      case 'data-export':
        await exportData.dataExport();
      case 'run-migration':
        await runMigrations();
    }
    return null;
  });


async function runMigrations() {
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let ref = db.collection("migrations");
  let querySnap = await ref.get();
  let ranMigrations = [];
  querySnap.forEach((migration) => {
    ranMigrations.push(migration.id);
  });

  if (!ranMigrations.includes("update-status-connection-fields")) {
    let result = await updateStatusConnectionFields();
    if (result) {
      await db.collection("migrations").doc("update-status-connection-fields").set({ success: true, timestamp: Math.round(Date.now() / 1000) })
    }
  }
}

async function updateStatusConnectionFields() {
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let ref = db.collection("updates");
  let querySnap = await ref.get();
  await querySnap.forEach(async (updateSnap) => {
    let update = updateSnap.data();
    let connectionId = update.connectionId;
    let refCon = db.collection("connections").doc(connectionId);
    let snapCon = await refCon.get();
    let connection = snapCon.data();
    connection.sourceType = "goal";
    if (connection.type === "goal-assessment") {
      connection.linkType = "assessment";
    }
    else if (connection.type === "goal-activity") {
      connection.linkType = "activity";
    }
    else if (["goal-prerequisites", "goal-deeperunderstandings", "goal-bigideas", "goal-specializations"].includes(connection.type)) {
      connection.linkType = "goal";
    }
    await db.collection("connections").doc(connectionId).update(connection);

    update.connectionSourceId = connection.sourceId;
    update.connectionLinkId = connection.linkId;
    update.connectionType = connection.type;
    update.connectionSourceType = connection.sourceType;
    update.connectionLinkType = connection.linkType;
    await db.collection("updates").doc(updateSnap.id).update(update);
  });
  return true;
}

