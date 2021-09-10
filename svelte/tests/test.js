const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "expwis";
const myId = "user_abc";
const theirId = "user_xyz";
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

describe("Expontineel wisvids", () => {
    // it("Can read items in the read-only collection", async() => {
    //     const db = getFirestore();
    //     const testDoc = db.collection("readonly").doc("testDoc");
    //     await firebase.assertSucceeds(testDoc.get());
    // })

    // it("Can't write items in the read-only collection", async() => {
    //     const db = getFirestore();
    //     const testDoc = db.collection("readonly").doc("testDoc2");
    //     await firebase.assertFails(testDoc.set({foo: "bar"}));
    // })
    
    // it("Can't write items in the read-only collection", async() => {
    //     const db = getFirestore();
    //     const testDoc = db.collection("readonly").doc("testDoc2");
    //     await firebase.assertFails(testDoc.set({foo: "bar"}));
    // })

    // it("Can't write to a user docmument with the same ID as our user", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("users").doc(myId);
    //     await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    // })

    // it("Can't write to a user docmument with a different ID as our user", async() => {
    //     const db = getFirestore(myAuth);
    //     const testDoc = db.collection("users").doc(theirId);
    //     await firebase.assertFails(testDoc.set({foo: "bar"}));
    // })

    it("Can query all posts set to public visibility", async() => {
        const db = getFirestore();
        const testQuery = db.collection("posts").where("visibility", '==', "public");
        await firebase.assertSucceeds(testQuery.get());
    })

    it("Can query all posts where the user is the author of", async() => {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts").where("authorId", '==', myId);
        await firebase.assertSucceeds(testQuery.get());
    })

    it("Can't query all posts", async() => {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts");
        await firebase.assertFails(testQuery.get());
    })

    it("Can query one public posts", async() => {
        const admin  = getAdminFirestore();
        const postId = "public_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, visibility: "public"});


        const db = getFirestore();
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    })

    it("Can't query private posts belonging to the user", async() => {
        const admin  = getAdminFirestore();
        const postId = "private_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: myId, visibility: "private"});


        const db = getFirestore();
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertFails(testRead.get());
    })

    it("Can query private posts belonging to the user", async() => {
        const admin  = getAdminFirestore();
        const postId = "private_posts";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: myId, visibility: "private"});


        const db = getFirestore(myAuth);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    })

    it("Can not query private posts not belonging to the user", async() => {
        const admin  = getAdminFirestore();
        const postId = "private_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, visibility: "private"});


        const db = getFirestore();
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertFails(testRead.get());
    })

    it("Can write posts not belonging to the user", async() => {
        const admin  = getAdminFirestore();
        const postId = "post_123";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: myId, content: "before"});

        const db = getFirestore(myAuth);
        const testWrite = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testWrite.set({content: "after"}));
    })

    it("Can not write posts not belonging to the user", async() => {
        const admin  = getAdminFirestore();
        const postId = "post_123";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, content: "before"});


        const db = getFirestore(myAuth);
        const testWrite = db.collection("posts").doc(postId);
        await firebase.assertFails(testWrite.set({content: "after"}));
    })

    it("Can write posts as anon", async() => {
        const admin  = getAdminFirestore();
        const postId = "post_123";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: myId, content: "before"});

        const db = getFirestore();
        const testWrite = db.collection("posts").doc(postId);
        await firebase.assertFails(testWrite.set({content: "after"}));
    })

    it("Can write a posts not belongen to the user as a moderator", async() => {
        const admin  = getAdminFirestore();
        const postId = "post_123";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, content: "before"});

        const db = getFirestore(myModeratorAuth);
        const testWrite = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testWrite.set({content: "after"}));
    })
});

after ( async() => {   
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});    
})