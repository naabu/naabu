import firebase from "firebase-admin";
// // console.log(process.env);

firebase.initializeApp()

let auth = firebase.auth();
auth.setCustomUserClaims('QUUeeSzTnVcIKkNH8VUdgQioNkJ3', {"canModerate":true, "canDebugDevelopment": true});
