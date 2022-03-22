const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

function getFirebaseApp() {
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
  if (environment === 'cypress' || environment === 'test') {
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


function shuffle(array) {
  var currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function compare(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 0;
}

function compareLastReplyAt(a, b) {
  if (a.lastReplyAt < b.lastReplyAt) {
    return 1;
  }
  if (a.lastReplyAt > b.lastReplyAt) {
    return -1;
  }
  return 0;
}

async function getActivitiesForGoal(goalId) {
  const fb = getFirebaseApp();
  let db = fb.firestore();
  let activitiesQuery = db.collection('activities').where('goalId', '==', goalId).where('status', '==', 'published');
  let activitiesQuerySnap = await activitiesQuery.get();
  let activities = [];
  activitiesQuerySnap.forEach((activitySnap) => {
    let activity = activitySnap.data();
    activity.id = activitySnap.id;
    activities.push(activity);
  });
  return activities;
}

const environment = functions.config().app.environment;
const defaultLanguage = functions.config().app.default_language;
let goalIndexName = getIndex('goals', environment);
let activityIndexName = getIndex('activities', environment);
let mapIndexName = getIndex('maps', environment);
const goalIndex = client.initIndex(goalIndexName);
const activityIndex = client.initIndex(activityIndexName);
const mapIndex = client.initIndex(mapIndexName);

exports.getFirebaseApp = getFirebaseApp;
exports.goalIndex = goalIndex;
exports.activityIndex = activityIndex;
exports.mapIndex = mapIndex;
exports.environment = environment;
exports.defaultLanguage = defaultLanguage;
exports.shuffle = shuffle;
exports.compare = compare;
exports.compareLastReplyAt = compareLastReplyAt;
exports.getActivitiesForGoal = getActivitiesForGoal;
