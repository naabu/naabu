const functions = require('firebase-functions');
const helper = require('../helper');
const exportData = require('./exportData');
const connectiinUpdate = require('../Connection/connectionUpdate');

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
          await connectiinUpdate.processStatusConnection(daysInSeconds, daysInSeconds, daysInSeconds);
        }
        break;
      case 'data-export':
        await exportData.dataExport();
    }
    return null;
  });