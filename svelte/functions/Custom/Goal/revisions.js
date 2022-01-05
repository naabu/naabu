const functions = require('firebase-functions');
const helper = require('../helper');

function getNextAndPreviousRevisions(revisionList, revisionId) {
  revisionList.sort(helper.compare);
  let nextRevision = null;
  let previousRevision = null;
  let previousPreviousRevision = null;
  for (let i = 0; i < revisionList.length; i++) {
    if (revisionList[i].id === revisionId) {
      if (i > 0) {
        nextRevision = revisionList[i - 1];
      }
      if (i < revisionList.length - 1) {
        previousRevision = revisionList[i + 1];
      }
      if (i < revisionList.length - 2) {
        previousPreviousRevision = revisionList[i + 2];
      }
    }
  }

  return {
    nextRevision: nextRevision,
    previousRevision: previousRevision,
    previousPreviousRevision: previousPreviousRevision
  }
}

exports.updateRevisionListsAndSetProfile = functions.firestore.document('revisions/{revisionId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let revisionData = snap.data();
    if (revisionData.revisionType === "goal") {
      let goalTitle = "";
      let goalRef = db.collection("goals").doc(revisionData.goalId);
      let goalSnap = await goalRef.get();
      let objectReturnRevisions = null;
      if (goalSnap.exists) {
        let goal = goalSnap.data();
        goalTitle = goal.title;
        let revisionList = [];
        if (goal.revisionList) {
          revisionList = goal.revisionList;
        }
        let revisionUpdateObject = {
          id: context.params.revisionId,
          createdAt: snap['_createTime']._seconds,
          revisionAuthorId: revisionData.revisionAuthorId,
        }
        if (revisionData.curriculumProfile) {
          revisionUpdateObject.curriculumProfile = revisionData.curriculumProfile
        }
        revisionList.push(revisionUpdateObject);
        objectReturnRevisions = getNextAndPreviousRevisions(revisionList, context.params.revisionId);
        if (objectReturnRevisions && objectReturnRevisions.previousRevision) {
          revisionList[0].previousRevisionId = objectReturnRevisions.previousRevision.id
        }
        goalRef.update({ revisionList: revisionList })
      }


      let profileRef = db.collection("curriculumProfile").doc(revisionData.authorId);
      let profileSnap = await profileRef.get();
      if (profileSnap.exists) {
        let profile = profileSnap.data();
        let revisionList = [];
        if (profile.revisionList) {
          revisionList = profile.revisionList;
        }
        let revisionToPush = {
          id: context.params.revisionId,
          createdAt: snap['_createTime']._seconds,
          goalId: revisionData.goalId,
          goalTitle: revisionData.title,
        }

        if (objectReturnRevisions && objectReturnRevisions.previousRevision) {
          revisionToPush.previousRevisionId = objectReturnRevisions.previousRevision.id
        }
        revisionList.push(revisionToPush)
        revisionList.sort(helper.compare);
        profileRef.update({ revisionList: revisionList })
      }
    }
    return null;
  });
