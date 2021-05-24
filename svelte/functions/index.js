const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');
const ENVIRONMENT = functions.config().app.environment;

let ssrServer;
exports.ssr = functions.https.onRequest(async (request, response) => {
      functions.logger.info(process.env);
      process.env.ENVIRONMENT = ENVIRONMENT;
      functions.logger.info(process.env);
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
const ENVIRONMENT = functions.config().app.environment;

const client = algoliasearch(APP_ID, ADMIN_KEY);
let goalIndex = 'goals';

console.log(functions.config());

if (ENVIRONMENT === 'acceptance') {
      goalIndex = 'acc_' + goalIndex;
}
else if (ENVIRONMENT === 'development') {
      goalIndex = 'dev_' + goalIndex;
}

console.log(goalIndex);
const index = client.initIndex(goalIndex);

exports.addToIndex = functions.firestore.document('goals/{goalId}')
.onCreate((snap, context)  => {
      console.log('addToIndex');
      const data = snap.data();
      const objectID = snap.id;
      return index.saveObject({... data, objectID});

});

exports.updateIndex = functions.firestore.document('goals/{goalId}')
.onUpdate((change, context) => {
      console.log('UpdateIndex');
      const newData = change.after.data();
      const objectID = change.after.id;
      return index.saveObject({... newData, objectID});
});

exports.deleteFromIndex = functions.firestore.document('goals/{goalId}')
.onDelete((snap, context) => {
      console.log('DeleteIndex');
      return index.deleteObject(snap.id);
});