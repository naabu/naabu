const functions = require('firebase-functions');
const helper = require('../helper');

exports.onMapPlayerCreated = functions.firestore.document('maps/{mapId}/players/{playerId}')
  .onCreate((snap, context) => {
    setMapActivitiesForUid(context.params.playerId);
  });

  