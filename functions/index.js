const functions = require('firebase-functions');
const helper = require('./Custom/helper');

// exports.goalSearch = require('./Custom/Goal/searchIndex.js');


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
    let ssrServer = require("./ssr/index").default;
    functions.logger.info("SvelteKit SSR Handler initialised!");
    return await ssrServer(request, response);
  });
