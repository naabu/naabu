const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "expwis";

const myId = "user_abc";
const myAuth = {uid: myId, email: "abc@gmail.com"}
const modId = "user_mod";
const myModeratorAuth = {uid: modId, email: "mod@gmail.com", canModerate: true}

function getFirestore(auth = null) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

beforeEach ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})

it("Cannot create a activity as anon", async() => {
    const db = getFirestore();
    const testWrite = db.collection("activities").doc("activity_123");
    await firebase.assertFails(testWrite.set({title: "title"}));
})

it("Cannot create a activity as a normal user", async() => {
    const db = getFirestore(myAuth);
    const testWrite = db.collection("activities").doc("activity_123");
    await firebase.assertFails(testWrite.set({title: "title"}));
})

it("Create a activity as a moderator", async() => {
    const db = getFirestore(myModeratorAuth);
    const testWrite = db.collection("activities").doc("activity_123");
    await firebase.assertSucceeds(testWrite.set({title: "title"}));
})

it("Edit a activity as a moderator", async() => {
    const admin  = getAdminFirestore();
    const goalId = "activity_123";
    const setupDoc = admin.collection("activities").doc(goalId);
    await setupDoc.set({title: "before"});

    const db = getFirestore(myModeratorAuth);
    const testUpdate = db.collection("activities").doc(goalId);
    await firebase.assertSucceeds(testUpdate.set({title: "after"}));
})

it("Can read a public activity as anon", async() => {
    const db = getFirestore();
    const testQuery = db.collection("activities").where("visibility", '==', 'public');
    await firebase.assertSucceeds(testQuery.get());
})

it("Can't read a private activity as anon", async() => {
    const db = getFirestore();
    const testQuery = db.collection("activities").where("visibility", '==', 'private');
    await firebase.assertFails(testQuery.get());
})

it("Can read a private activity as moderator", async() => {
    const db = getFirestore(myModeratorAuth);
    const testQuery = db.collection("activities").where("visibility", '==', 'private');
    await firebase.assertSucceeds(testQuery.get());
})

after ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})