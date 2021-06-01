const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');
const ENVIRONMENT = functions.config().app.environment;

let ssrServer;
exports.ssr = functions.https.onRequest(async (request, response) => {
  functions.logger.info(process.env);
  process.env.ENVIRONMENT = ENVIRONMENT;
  process.env.firestore = functions.firestore;
  functions.logger.info(functions.firestore);
  if (!ssrServer) {
    functions.logger.info("Initializing SvelteKit SSR Handler");
    ssrServer = require("./ssr/index").default;
    functions.logger.info("SvelteKit SSR Handler initialised!");
  }
  functions.logger.info(process.env);
  return await ssrServer(request, response);
});

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);

function getIndex(suffix, environment) {
  let index = suffix;
  if (environment === 'development') {
    index = "dev_" + suffix;
  }
  else if (environment === 'acceptance') {
    index = "acc_" + suffix;
  }
  else if (environment === 'production') {
    index = "prod_" + suffix;
  }
  return index;
}

let goalIndexName = getIndex('goals', ENVIRONMENT);
let activityIndexName = getIndex('activities', ENVIRONMENT);
const goalIndex = client.initIndex(goalIndexName);
const activityIndex = client.initIndex(activityIndexName);

exports.addToGoalIndex = functions.firestore.document('goals/{goalId}')
.onCreate((snap, context)  => {
  const data = snap.data();
  const objectID = snap.id;
  return goalIndex.saveObject({... data, objectID});
});

exports.updateGoalIndex = functions.firestore.document('goals/{goalId}')
.onUpdate((change, context) => {
  console.log('UpdateIndex');
  const newData = change.after.data();
  const objectID = change.after.id;
  return goalIndex.saveObject({... newData, objectID});
});

exports.deleteFromGoalIndex = functions.firestore.document('goals/{goalId}')
.onDelete((snap, context) => {
  console.log('DeleteIndex');
  return goalIndex.deleteObject(snap.id);
});

exports.addToActivityIndex = functions.firestore.document('activities/{activyId}')
.onCreate((snap, context)  => {
  const data = snap.data();
  const objectID = snap.id;
  return activityIndex.saveObject({... data, objectID});
});

exports.updateActivityIndex = functions.firestore.document('activities/{activyId}')
.onUpdate((change, context) => {
  const newData = change.after.data();
  const objectID = change.after.id;
  return activityIndex.saveObject({... newData, objectID});
});

exports.deleteFromActivityIndex = functions.firestore.document('activities/{activyId}')
.onDelete((snap, context) => {
  return activityIndex.deleteObject(snap.id);
});