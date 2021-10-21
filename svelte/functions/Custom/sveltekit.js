const functions = require("firebase-functions");
const helper = require('./helper');

exports.ssr = functions.https.onRequest(async (request, response) => {
  process.env.environment = helper.environment;
  process.env.defaultMapId = helper.defaultMapId;
  // process.env.firestore = functions.firestore;
  functions.logger.info(functions.firestore);
  process.env.fb = require('firebase');
  functions.logger.info("Initializing SvelteKit SSR Handler");
  ssrServer = require("../ssr/index").default;
  functions.logger.info("SvelteKit SSR Handler initialised!");
  return await ssrServer(request, response);
});
