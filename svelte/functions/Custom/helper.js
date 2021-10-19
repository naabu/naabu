const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const ENVIRONMENT = functions.config().app.environment;
const DEFAULT_MAP_ID = functions.config().app.defaultmapid;

function getFirebaseApp() {
  console.log('GetAdmin');
  const admin = require("firebase-admin");
  let firebaseApp;
  try {
    let defaultAppCheck = admin.appCheck();
    firebaseApp = defaultAppCheck.app;
  }
  catch (error) {
    firebaseApp = admin.initializeApp();
  }
  return firebaseApp;
}

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(APP_ID, ADMIN_KEY);
function getIndex(suffix, environment) {
  let index = suffix;
  if (environment === 'development') {
    index = "dev_" + suffix;
  }
  if (environment === 'cypress') {
    index = "cypress_" + suffix;
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
let mapIndexName = getIndex('maps', ENVIRONMENT);
const goalIndex = client.initIndex(goalIndexName);
const activityIndex = client.initIndex(activityIndexName);
const mapIndex = client.initIndex(mapIndexName);

exports.getFirebaseApp = getFirebaseApp;
exports.goalIndex = goalIndex;
exports.activityIndex = activityIndex;
exports.mapIndex = mapIndex;
exports.ENVIRONMENT = ENVIRONMENT;
exports.DEFAULT_MAP_ID = DEFAULT_MAP_ID;