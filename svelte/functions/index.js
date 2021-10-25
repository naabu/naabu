const functions = require('firebase-functions');
const helper = require('./Custom/helper');

exports.goalSearch = require('./Custom/Goal/searchIndex.js');
exports.revision = require('./Custom/Goal/revisions.js');
exports.adventure = require('./Custom/Goal/adventures.js');
exports.connection = require('./Custom/Goal/connections.js');
exports.mapSearch = require('./Custom/Map/searchIndex.js');
exports.map = require('./Custom/Map/map.js');
exports.trigger = require('./Custom/Trigger/exportData.js');
exports.talkPost = require('./Custom/Talk/post.js');
exports.activity = require('./Custom/Activity/searchIndex.js');


exports.ssr = functions.https.onRequest(async (request, response) => {
  process.env.environment = helper.environment;
  process.env.defaultMapId = helper.defaultMapId;
  // process.env.firestore = functions.firestore;
  functions.logger.info(functions.firestore);
  process.env.fb = require('firebase');
  functions.logger.info("Initializing SvelteKit SSR Handler");
  ssrServer = require("./ssr/index").default;
  functions.logger.info("SvelteKit SSR Handler initialised!");
  return await ssrServer(request, response);
});
