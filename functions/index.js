const functions = require('firebase-functions');
const helper = require('./Custom/helper');

exports.goalSearch = require('./Custom/Goal/searchIndex.js');
exports.revision = require('./Custom/Goal/revisions.js');
exports.mapSearch = require('./Custom/Map/searchIndex.js');
// exports.map = require('./Custom/Map/map.js');
exports.trigger = require('./Custom/Trigger/exportData.js');
exports.manualTrigger = require('./Custom/Trigger/manualTrigger.js');
exports.talkPost = require('./Custom/Talk/post.js');
exports.searchActivity = require('./Custom/Activity/searchIndex.js');
exports.removeActivity = require('./Custom/Activity/remove.js');
exports.connection = require('./Custom/Connection/connection.js');
exports.connectionUpdate = require('./Custom/Connection/connectionUpdate.js');
exports.connectionSearchIndex = require("./Custom/Connection/searchIndex.js");
exports.module = require('./Custom/Module/module.js');
exports.user = require('./Custom/User/addCustomClaims.js');
exports.goalAssessment = require('./Custom/Goal/assessments.js');
exports.goalModel = require('./Custom/Goal/models.js');
exports.activityUpdates = require('./Custom/Activity/updates.js');

exports.ssr = functions.
  runWith({
    minInstances: 1,
  }).
  https.onRequest(async (request, response) => {
    process.env.environment = helper.environment;
    process.env.defaultMapId = helper.defaultMapId;
    process.env.defaultLanguage = helper.defaultLanguage;
    functions.logger.info(functions.firestore);
    process.env.fb = require('firebase');
    functions.logger.info("Initializing SvelteKit SSR Handler");
    ssrServer = require("./ssr/index").default;
    functions.logger.info("SvelteKit SSR Handler initialised!");
    return await ssrServer(request, response);
  });
