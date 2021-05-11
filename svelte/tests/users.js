const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "expwis";

const myId = "user_abc";
const myAuth = {uid: myId, email: "abc@gmail.com"}
const moderatorId = "user_mod";
const myModeratorAuth = {uid: moderatorId, email: "mod@gmail.com", isModerator: true}
const adminId = "user_admin";
const myAdminAuth = {uid: adminId, email: "admin@gmail.com", isAdmin: true}
serviceAccount = require('../../adminkey.json');

const firebaseConfig = {
    apiKey: "AIzaSyDTQTwe21wwYm2TsMBwH8m1lSHWMEK4KmQ",
    authDomain: "expwis.firebaseapp.com",
    projectId: "expwis",
    storageBucket: "expwis.appspot.com",
    messagingSenderId: "950890412912",
    appId: "1:950890412912:web:a248488bf4e6eb2bc3adb5",
    measurementId: "G-8ZT9LCY8BY",
    credential: serviceAccount
  };

  process.env.FIREBASECONGIF
function getFirestore(auth = null) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

function getAdminAuth() {
    const admin = firebase.initializeAdminApp(firebaseConfig).auth();
    return admin;
    // return firebase.initializeAdminApp({projectId: MY_PROJECT_ID});
}

beforeEach ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})

it("Can assign an moderator role as an admin", async() => {
    let amdmin = getAdminAuth();
    // TODO: https://firebase-community.slack.com/archives/C1BL01PS7/p1620639105407800
    // let user = createNormalUser();
    // console.log(process.env);
    // const db = getFirestore(myAdminAuth);
    // const testWrite = db.collection("goals").doc("goal_123");
    // await firebase.assertFails(testWrite.set({title: "before", taxonomy: ['bloom_1_2', 'bloom_3_4', 'solo3']}));
})

after ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})