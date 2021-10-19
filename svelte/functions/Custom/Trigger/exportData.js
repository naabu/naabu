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