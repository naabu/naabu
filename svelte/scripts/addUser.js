import firebase from "firebase-admin";
// // console.log(process.env);

firebase.initializeApp()

let auth = firebase.auth();
auth.setCustomUserClaims('PG3y9x3wB5VwwGks7aYU5IrABHj1', {"canModerate":true});
