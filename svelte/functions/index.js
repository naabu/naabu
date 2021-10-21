const functions = require("firebase-functions");
const helper = require('./Custom/helper');

exports.ssr = require('./Custom/sveltekit');
exports.goalSearch = require('./Custom/Goal/searchIndex.js');
exports.revision = require('./Custom/Goal/revisions.js');
exports.mapSearch = require('./Custom/Map/searchIndex.js');
exports.map = require('./Custom/Map/map.js');
exports.trigger = require('./Custom/Trigger/exportData.js');
exports.talkPost = require('./Custom/Talk/post.js');

// Step 1. When a new feedback item is created (userid)
// Step 2. Load the user data. (activity sequence data)
// Step 3. Load all activities (ids)
// Step 4. Load the model.
// Step 5. Run the model to get all scores for all activities
// Step 6. Sort the list of activities on score (Higest on top)
// Step 7. Safe the list to the path of the user

// exports.calculateBestPath = functions.firestore.document('feedback/{feedbackId}')
//   .onCreate((snap, context) => {
//     const fb = helper.getFirebaseApp();
//     let db = fb.firestore();
//     const data = snap.data();
//     const objectID = snap.id;
//     let feedbackRef = db.collection("feedback");
//     db.collection("feedback").where("uid", "==", data.uid).orderBy("time")
//       .get()
//       .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//               console.log(doc.id, " => ", doc.data());
//           });
//       })
//       .catch((error) => {
//           console.log("Error getting documents: ", error);
//       });
//       return null;
//   });






function setArrayAdventure(adventuresArray, adventure, isDeleted = false) {
  if (!adventuresArray) {
    adventuresArray = [];
  }
  let index = adventuresArray.findIndex(a => a.id === adventure.id);
  if (isDeleted) {
    if (index !== -1) {
      adventuresArray.splice(index, 1);
    }
  }
  else {
    if (!adventure.inNeedsWorkAt) {
      adventure.inNeedsWorkAt = adventure.lastUpdatesAt;
    }
    if (!adventure.inProgressAt) {
      adventure.inProgressAt = adventure.lastUpdatesAt;
    }
    if (!adventure.inNeedsForApprovalAt) {
      adventure.inNeedsForApprovalAt = adventure.lastUpdatesAt;
    }
    let changedAdventure = {
      id: adventure.id,
      difficulty: adventure.difficulty,
      type: adventure.type,
      svg: adventure.svg,
      title: adventure.title,
      status: adventure.status,
      createdAt: adventure.createdAt,
      modifiedAt: adventure.modifiedAt,
      lastUpdatesAt: adventure.lastUpdatesAt,
      inNeedsWorkAt: adventure.inNeedsWorkAt,
      inProgressAt: adventure.inProgressAt,
      inNeedsForApprovalAt: adventure.inNeedsForApprovalAt,
    }
    if (index !== -1) {
      adventuresArray[index] = changedAdventure;
    }
    else {
      adventuresArray.push(changedAdventure);
    }
  }
  return adventuresArray;
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

exports.createGoalAdventureLists = functions.firestore.document("goals/{goalId}/adventures/{adventureId}")
  .onWrite(async (change, context) => {
    let isDeleted = false;
    let adventure;
    if (!change.after.exists) {
      isDeleted = true;
      adventure = change.before.data();
      adventure.id = change.before.ref.id;
    }
    else {
      adventure = change.after.data();
      adventure.id = change.after.ref.id;
    }


    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let goalRef = db.collection("goals").doc(context.params.goalId);
    let goalSnap = await goalRef.get();
    if (goalSnap.exists) {
      let goal = goalSnap.data();

      if (!goal.publishedAdventures) {
        goal.publishedAdventures = [];
      }
      if (!goal.needsApprovalAdventures) {
        goal.needsApprovalAdventures = [];
      }
      if (!goal.inProgressAdventures) {
        goal.inProgressAdventures = [];
      }
      if (!goal.needsWorkAdventures) {
        goal.needsWorkAdventures = [];
      }
      if (!goal.trashCanAdventures) {
        goal.trashCanAdventures = [];
      }

      let allAdventures = [...goal.publishedAdventures, ...goal.needsApprovalAdventures, ...goal.inProgressAdventures, ...goal.needsWorkAdventures, ...goal.trashCanAdventures];

      // allAdventures Make unique distinct on ID
      // allAdventures.map(a => a.id)
      //   .filter((value, index, self) => self.indexOf(value) === index);
      // allAdventures.filter((value, index, self) => self.map(a => a.id).indexOf(value.id) == index)

      allAdventures = [...new Map(allAdventures.map(item =>
        [item['id'], item])).values()];
      setArrayAdventure(allAdventures, adventure, isDeleted);

      goal.publishedAdventures = [];
      goal.needsApprovalAdventures = [];
      goal.inProgressAdventures = [];
      goal.needsWorkAdventures = [];
      goal.trashCanAdventures = [];
      let idsAdded = [];
      for (let i = 0; i < allAdventures.length; i++) {
        let theAdventure = allAdventures[i];
        if (!idsAdded.includes(theAdventure.id)) {
          idsAdded.push(theAdventure.id);
          switch (theAdventure.status) {
            case 'published':
              goal.publishedAdventures.push(theAdventure);
              break;
            case 'needs-approval':
              goal.needsApprovalAdventures.push(theAdventure);
              break;
            case 'in-progress':
              goal.inProgressAdventures.push(theAdventure);
              break;
            case 'needs-work':
              goal.needsWorkAdventures.push(theAdventure);
              break;
            case 'in-trash':
              goal.trashCanAdventures.push(theAdventure);
              break;
          }
        }
        else {
          console.log('duplicate id detected');
        }
      }

      await goalRef.update({
        publishedAdventures: goal.publishedAdventures,
        needsApprovalAdventures: goal.needsApprovalAdventures,
        inProgressAdventures: goal.inProgressAdventures,
        needsWorkAdventures: goal.needsWorkAdventures,
        trashCanAdventures: goal.trashCanAdventures
      });
    }
    return null;
  });



exports.addToActivityIndex = functions.firestore.document('activities/{activyId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return helper.activityIndex.saveObject({ ...data, objectID });
  });

exports.updateActivityIndex = functions.firestore.document('activities/{activyId}')
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    helper.activityIndex.saveObject({ ...newData, objectID });
    // If activity is changed. Change all similmar activies in the path collections.
    const fb = helper.getFirebaseApp();
    db = fb.firestore();
    let pathRef = db.collection("path");
    let updatedActivityChoiceData = {
      title: newData.title,
      type: newData.type,
      svg: newData.svg,
      difficulty: newData.difficulty,
    }

    pathRef.where('activityIds', 'array-contains', objectID).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
          let pathData = docSnap.data();
          for (let i = 0; i < pathData.activities.length; i++) {
            if (pathData.activities[i].id === objectID) {
              pathData.activities[i].data = updatedActivityChoiceData;
            }
          }
          docSnap.ref.set(pathData);
        });
      });
    return null;
  });

exports.deleteFromActivityIndex = functions.firestore.document('activities/{activyId}')
  .onDelete((snap, context) => {
    helper.activityIndex.deleteObject(snap.id);
    // Also delete it from all the paths.
    return null;
  });


