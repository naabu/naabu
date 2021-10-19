const functions = require('firebase-functions');
const helper = require('../helper');

exports.onCreatePost = functions.firestore.document('talk/{talkId}/posts/{postId}')
  .onCreate(async (snap, context) => {
    snap.ref.update({
      createdAt: snap['_createTime']._seconds,
      modifiedAt: snap['_createTime']._seconds,
      lastReplyAt: snap['_createTime']._seconds,
    });
    if (snap.exists) {
      const fb = helper.getFirebaseApp();
      let db = fb.firestore();

      let postData = snap.data();
      let goal;

      let query = db.collection("goals").where("talkId", "==", context.params.talkId).limit(1);
      let querySnap = await query.get();
      querySnap.forEach((goalDoc) => {
        let goalData = goalDoc.data();
        goal = {};
        goal.title = goalData.title;
        goal.id = goalDoc.id;
      });


      let profileRef = db.collection("curriculumProfile").doc(postData.authorId);
      let profileSnap = await profileRef.get();
      if (profileSnap.exists && goal) {
        let profile = profileSnap.data();
        let postList = [];
        if (profile.postList) {
          postList = profile.postList;
        }
        let postToPush = {
          talkId: context.params.talkId,
          postId: context.params.postId,
          createdAt: snap['_createTime']._seconds,
          postTitle: postData.title,
          goalId: goal.id,
          goalTitle: goal.title,
          type: 'post'
        }
        postList.push(postToPush)
        postList.sort(compareLastReplyAt);
        profileRef.update({ postList: postList })
      }
    }
    return null;
  });

exports.onCreateReply = functions.firestore.document('talk/{talkId}/posts/{postId}/replies/{replyId}')
  .onCreate(async (snap, context) => {
    snap.ref.update({ createdAt: snap['_createTime']._seconds });
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    let postRef = db.collection('talk').doc(context.params.talkId).collection('posts').doc(context.params.postId);
    await postRef.update({ lastReplyAt: snap['_createTime']._seconds });

    if (snap.exists) {
      const fb = helper.getFirebaseApp();
      let db = fb.firestore();
      let replyData = snap.data();
      let goal;

      let query = db.collection("goals").where("talkId", "==", context.params.talkId).limit(1);
      let querySnap = await query.get();
      querySnap.forEach((goalDoc) => {
        let goalData = goalDoc.data();
        goal = {};
        goal.title = goalData.title;
        goal.id = goalDoc.id;
      });

      let profileRef = db.collection("curriculumProfile").doc(replyData.authorId);
      let profileSnap = await profileRef.get();
      if (profileSnap.exists && goal) {
        let profile = profileSnap.data();
        let postList = [];
        if (profile.postList) {
          postList = profile.postList;
        }
        let replyToPush = {
          talkId: context.params.talkId,
          postId: context.params.postId,
          replyId: context.params.replyId,
          createdAt: snap['_createTime']._seconds,
          replyText: replyData.text,
          goalId: goal.id,
          goalTitle: goal.title,
          type: 'reply'
        }
        console.log(replyToPush);
        postList.push(replyToPush)
        postList.sort(compare);
        profileRef.update({ postList: postList })
      }
    }

    return null;
  });