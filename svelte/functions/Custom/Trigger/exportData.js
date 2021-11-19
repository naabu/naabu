const functions = require('firebase-functions');
const helper = require('../helper');

exports.scheduleExport = functions.pubsub.schedule('0 3 * * *')
  .timeZone('Europe/Amsterdam')
  .onRun((context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let triggerData = {
      lastTriggerTimestamp: Date.now()
    }
    let triggersRef = db.collection("triggers");
    triggersRef.doc('data-export').set(triggerData).then(() => {
      functions.logger.info('Exported data in data-export trigger');
    });
    return null;
  });





async function getGoalConnectionExport(db, goalExport, connectionName) {
  let connectionColRef = db.collection("goals").doc(goalExport.id).collection(connectionName);
  return connectionColRef.get().then((connectionQuerySnap) => {
    let i = 0;
    connectionQuerySnap.forEach((connectionSnap) => {
      let goalConnection = connectionSnap.data();
      if (goalConnection.status === 'published') {
        goalExport["goal_links_" + connectionName + "_" + i + "_id"] = goalConnection.connectionGoalId;
        i = i + 1;
      }
    });
    return goalExport;
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });
}

async function getAdventureExport(db, goalExport, adventuresExport) {
  let adventuresColRef = db.collection("goals").doc(goalExport.id).collection('adventures');
  return adventuresColRef.get().then((adventuresQuerySnap) => {
    let i = 0;
    adventuresQuerySnap.forEach((adventureSnap) => {
      let adventure = adventureSnap.data();
      if (adventure.status === 'published') {
        let adventureExport = {
          id: adventureSnap.id,
          title: adventure.title,
          goalId: goalExport.id,
        };
        adventuresExport.push(adventureExport);
      }
    });
    return adventuresExport;
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });
}

exports.dataExport = async function dataExport() {
  console.log('Export started');
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();

  let goalsColRef = db.collection("goals");
  let goalsExport = await goalsColRef.get().then((goalsQuerySnap) => {
    let goals = [];
    goalsQuerySnap.forEach((goalSnap) => {
      let goal = goalSnap.data();
      let goalExport = {};
      goalExport.title = goal.title;
      goalExport.id = goalSnap.id;
      goals.push(goalExport);
    }
    );
    return goals;
  }).catch((error) => {
    console.log("Error getting documents: ", error);
  });

  let adventuresExport = [];
  for (let i = 0; i < goalsExport.length; i++) {
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'prerequisites');
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'specializations');
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'bigideas');
    goalsExport[i] = await getGoalConnectionExport(db, goalsExport[i], 'deeperunderstandings');
    adventuresExport = await getAdventureExport(db, goalsExport[i], adventuresExport);
  }

  let feedbackExport = await db.collection("feedback").get().then((querySnapshot) => {
    let feedbackExportData = [];
    querySnapshot.forEach((docSnap) => {
      let feedbackData = docSnap.data();
      if (feedbackData.adventureId) {
        let exportData = {
          adventureId: feedbackData.adventureId,
          feedbackValue: feedbackData.feedbackValue,
          time: feedbackData.time,
          uid: feedbackData.uid
        }
        switch (feedbackData.feedbackValue) {
          case -1:
            exportData.feedback = 'too-difficult';
            break;
          case -0.5:
            exportData.feedback = 'too-easy';
            break;
          case 1:
            exportData.feedback = 'just-right';
            break;
        }

        feedbackExportData.push(exportData);
      }
    });
    return feedbackExportData;

  }).catch(err => {
    functions.logger.error(err.message);
  });



  let goalsExportJson = JSON.stringify(goalsExport);
  let adventuresExportJson = JSON.stringify(adventuresExport);
  let feedbackExportJson = JSON.stringify(feedbackExport);

  let exportData = {
    adventures: adventuresExportJson,
    goals: goalsExportJson,
    feedback: feedbackExportJson,
    createdAt: Date.now()
  }

  return db.collection("dataExport").add(exportData);
}
