const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "expwis";

const myId = "user_abc";
const myAuth = {uid: myId, email: "abc@gmail.com"}
const adminId = "user_admin";
const myModeratorAuth = {uid: adminId, email: "admin@gmail.com", isAdmin: true}

function getFirestore(auth = null) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

beforeEach ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})

it("Can assign an moderator role as an admin", async() => {
    const db = getFirestore();
    const testWrite = db.collection("goals").doc("goal_123");
    await firebase.assertFails(testWrite.set({title: "before", taxonomy: ['bloom_1_2', 'bloom_3_4', 'solo3']}));
})

it("Can assign an admin role as an admin", async() => {
    const db = getFirestore(myAuth);
    const testWrite = db.collection("goals").doc("goal_123");
    await firebase.assertFails(testWrite.set({title: "before", taxonomy: ['bloom_1_2', 'bloom_3_4', 'solo3']}));
})

it("Can not assign roles as a moderator", async() => {
    const db = getFirestore(myModeratorAuth);
    const testWrite = db.collection("goals").doc("goal_123");
    await firebase.assertSucceeds(testWrite.set({title: "before", taxonomy: ['bloom_1_2', 'bloom_3_4', 'solo3']}));
})

it("Can not assign roles as a normal user", async() => {
    const admin  = getAdminFirestore();
    const goalId = "goal_123";
    const setupDoc = admin.collection("goals").doc(goalId);
    await setupDoc.set({title: "before", taxonomy: ['bloom_1_2', 'bloom_3_4', 'solo3']});

    const db = getFirestore(myModeratorAuth);
    const testUpdate = db.collection("goals").doc(goalId);
    await firebase.assertSucceeds(testUpdate.set({content: "after", taxonomy: ['bloom_2_2', 'bloom_4_4', 'solo4']}));
})

it("Can read a public goals as anon", async() => {
    const db = getFirestore();
    const testQuery = db.collection("goals").where("visibility", '==', 'public');
    await firebase.assertSucceeds(testQuery.get());
})

it("Can't read a private goals as anon", async() => {
    const db = getFirestore();
    const testQuery = db.collection("goals").where("visibility", '==', 'private');
    await firebase.assertFails(testQuery.get());
})

it("Can read a private goals as moderator", async() => {
    const db = getFirestore(myModeratorAuth);
    const testQuery = db.collection("goals").where("visibility", '==', 'private');
    await firebase.assertSucceeds(testQuery.get());
})

after ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})