const functions = require('firebase-functions');
const helper = require('../helper');

if (helper.environment === 'development' || helper.environment === 'cypress' || helper.environment === 'test') {
  exports.addClaimsBasedOnUsername = functions
    .runWith({
      minInstances: 1,
    })
    .auth.user().onCreate(async (user, eventContext) => {
      if (helper.environment === 'development' || helper.environment === 'cypress' || helper.environment === 'test') {
        console.log(user);
        const fb = helper.getFirebaseApp();
        const auth = fb.auth();
        if (user.email !== null) {
          let claims = {};
          let addedClaims = false;
          if (user.email.includes("deletegoals")) {
            claims.canDeleteGoals = true;
            addedClaims = true;
          }
          if (user.email.includes("canmoderate")) {
            claims.canModerate = true;
            addedClaims = true;
          }
          if (addedClaims) {
            await auth.setCustomUserClaims(user.uid, claims);
          }
        }
      }
      return null;
    });
}