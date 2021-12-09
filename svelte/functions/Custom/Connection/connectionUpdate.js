const functions = require('firebase-functions');
const helper = require('../helper');

exports.processStatusConnection = async function processStatusAutomatically(secondsToProgressCheck, secondsToApproveCheck, secondsToTrashCheck) {  
  const fb = helper.getFirebaseApp();
  let db = fb.firestore();
  let currentServerTime = Date.now() / 1000;

  let connectionsColInProgressAt = db.collection("connections").where("status", "==", "in-progress").where("inProgressAt", "<",  currentServerTime - secondsToProgressCheck );
  let connectionsColInProgressAtSnap = await connectionsColInProgressAt.get();

  connectionsColInProgressAtSnap.forEach(async (connectionSnap) => {
    await connectionSnap.ref.update({ status: 'needs-approval', inNeedsForApprovalAt: currentServerTime });
  });

  let connectionsColNeedsApprovalAt = db.collection("connections").where("status", "==", "needs-approval").where("inNeedsForApprovalAt", "<",  currentServerTime - secondsToApproveCheck );
  let connectionsColNeedsApprovalAtSnap = await connectionsColNeedsApprovalAt.get();

  connectionsColNeedsApprovalAtSnap.forEach(async (connectionSnap) => {
    await connectionSnap.ref.update({ status: 'needs-work', inNeedsWorkAt: currentServerTime });
  });

  let connectionsColNeedsWorkAt = db.collection("connections").where("status", "==", "needs-work").where("inNeedsWorkAt", "<",  currentServerTime - secondsToTrashCheck );
  let connectionsColNeedsWorkSnap = await connectionsColNeedsWorkAt.get();

  connectionsColNeedsWorkSnap.forEach(async (connectionSnap) => {
    await connectionSnap.ref.update({ status: 'in-trash', inTrashAt: currentServerTime });
  });
}


// Check every 6 hours...
// Check if inProgressAt time is more then X days ago?
exports.checkInProgressSchedule = functions.pubsub.schedule('0 */6 * * *')
  .onRun(async (context) => {
    console.log('Run every 6 hours');
    let daysToWorkSeconds = 2 * 86400;
    let daysToApprovalSeconds = 3 * 86400;
    let daysToSendToTrashSeconds = 100 * 86400;
    // Get all adventures that are in progress.
    // We want to check if the inProgressAt time is over X days.
    // If so we want to set the status to needs-approval
    await processStatusAutomatically(daysToWorkSeconds, daysToApprovalSeconds, daysToSendToTrashSeconds);
    return null;
  });

  