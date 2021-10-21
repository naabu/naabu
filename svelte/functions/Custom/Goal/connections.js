const functions = require('firebase-functions');
const helper = require('../helper');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setArrayConnection(connectionArray, connection, isDeleted = false) {
  if (!connectionArray) {
    connectionArray = [];
  }
  let index = connectionArray.findIndex(a => a.id === connection.id);
  if (isDeleted) {
    if (index !== -1) {
      connectionArray.splice(index, 1);
    }
  }
  else {
    if (!connection.inNeedsWorkAt) {
      connection.inNeedsWorkAt = connection.lastUpdatesAt;
    }
    if (!connection.inProgressAt) {
      connection.inProgressAt = connection.lastUpdatesAt;
    }
    if (!connection.inNeedsForApprovalAt) {
      connection.inNeedsForApprovalAt = connection.lastUpdatesAt;
    }
    let changedConnection = {
      id: connection.id,
      connectionDescription: connection.connectionDescription,
      description: connection.description,
      title: connection.title,
      status: connection.status,
      createdAt: connection.createdAt,
      modifiedAt: connection.modifiedAt,
      lastUpdatesAt: connection.lastUpdatesAt,
      inNeedsWorkAt: connection.inNeedsWorkAt,
      inProgressAt: connection.inProgressAt,
      inNeedsForApprovalAt: connection.inNeedsForApprovalAt,
    }

    if (index !== -1) {
      connectionArray[index] = changedConnection;
    }
    else {
      connectionArray.push(changedConnection);
    }
  }
  return connectionArray;
}

async function handleConnectionLists(change, context, connectionType) {
  let isDeleted = false;
  let connection;
  if (!change.after.exists) {
    isDeleted = true;
    connection = change.before.data();
    connection.id = change.before.ref.id;
  }
  else {
    connection = change.after.data();
    connection.id = change.after.ref.id;
  }

  let arrayNames = [
    'published' + capitalizeFirstLetter(connectionType),
    'needsApproval' + capitalizeFirstLetter(connectionType),
    'inProgress' + capitalizeFirstLetter(connectionType),
    'needsWork' + capitalizeFirstLetter(connectionType),
    'trashCan' + capitalizeFirstLetter(connectionType),
  ]

  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let goalRef = db.collection("goals").doc(context.params.goalId);
  let goalSnap = await goalRef.get();
  if (goalSnap.exists) {
    let goal = goalSnap.data();
    for (let i = 0; i < arrayNames.length; i++) {
      let arrayName = arrayNames[i]
      if (!goal[arrayName]) {
        goal[arrayName] = [];
      }
    }
    let allConnections = [...goal[arrayNames[0]], ...goal[arrayNames[1]], ...goal[arrayNames[2]], ...goal[arrayNames[3]], ...goal[arrayNames[4]]];

    allConnections = [...new Map(allConnections.map(item =>
      [item['id'], item])).values()];

    setArrayConnection(allConnections, connection, isDeleted);

    goal[arrayNames[0]] = [];
    goal[arrayNames[1]] = [];
    goal[arrayNames[2]] = [];
    goal[arrayNames[3]] = [];
    goal[arrayNames[4]] = [];

    let idsAdded = [];
    for (let i = 0; i < allConnections.length; i++) {
      let theConnection = allConnections[i];
      if (!idsAdded.includes(theConnection.id)) {
        idsAdded.push(theConnection.id);
        switch (theConnection.status) {
          case 'published':
            goal[arrayNames[0]].push(theConnection);
            break;
          case 'needs-approval':
            goal[arrayNames[1]].push(theConnection);
            break;
          case 'in-progress':
            goal[arrayNames[2]].push(theConnection);
            break;
          case 'needs-work':
            goal[arrayNames[3]].push(theConnection);
            break;
          case 'in-trash':
            goal[arrayNames[4]].push(theConnection);
            break;
        }
      }
      else {
        console.log('duplicate id detected');
      }
    }

    let updateObject = {};
    updateObject[arrayNames[0]] = goal[arrayNames[0]];
    updateObject[arrayNames[1]] = goal[arrayNames[1]];
    updateObject[arrayNames[2]] = goal[arrayNames[2]];
    updateObject[arrayNames[3]] = goal[arrayNames[3]];
    updateObject[arrayNames[4]] = goal[arrayNames[4]];
    await goalRef.update(updateObject);
  }
}

exports.createGoalPrerequisitsLists = functions.firestore.document("goals/{goalId}/prerequisites/{prerequisiteId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'prerequisites');
  });

exports.createGoaSpecializationLists = functions.firestore.document("goals/{goalId}/specializations/{specializationId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'specializations');
  });

exports.createGoalBigIdeasLists = functions.firestore.document("goals/{goalId}/bigideas/{bigideaId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'bigideas');
  });

exports.createGoalDeeperUnderstandingLists = functions.firestore.document("goals/{goalId}/deeperunderstandings/{deeperunderstandingId}")
  .onWrite(async (change, context) => {
    await handleConnectionLists(change, context, 'deeperunderstandings');
  });

