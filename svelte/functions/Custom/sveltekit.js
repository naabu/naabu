const functions = require("firebase-functions");
const helper = require('./helper');

exports.ssr = functions.https.onRequest(async (request, response) => {
  process.env.ENVIRONMENT = helper.ENVIRONMENT;
  process.env.DEFAULT_MAP_ID = helper.DEFAULT_MAP_ID;
  // process.env.firestore = functions.firestore;
  functions.logger.info(functions.firestore);
  process.env.fb = require('firebase');
  functions.logger.info("Initializing SvelteKit SSR Handler");
  ssrServer = require("../ssr/index").default;
  functions.logger.info("SvelteKit SSR Handler initialised!");
  return await ssrServer(request, response);
});
