const functions = require('firebase-functions');
const helper = require('../helper');


exports.createConnectionAssessment = functions.firestore.document('assessments/{assessmentId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let assessment = snap.data();
    let connectionData = {
      type: "goal-assessment",
      sourceId: assessment.goalId,
      linkId: snap.id,
      sourceType: "goal",
      linkType: "assessment",
      updatedAt: snap['_createTime']._seconds,
      modifiedAt: snap['_createTime']._seconds,
      lastUpdatesAt: snap['_createTime']._seconds,
      authorId: assessment.authorId,
      title: assessment.title,
      fields: [
        {
          title: "description",
          value: assessment.description,
        },
      ],
      status: "in-progress",
    };

    await db.collection("connections").add(connectionData);
  });


exports.updateForAssessmentConnectionCreate = functions.firestore.document('connections/{connectionId}')
  .onCreate(async (snap, context) => {
    const fb = helper.getFirebaseApp();
    let db = fb.firestore();

    let connection = snap.data();

    if (connection.type === "goal-assessment") {
      let assessmentRef =  db.collection("assessments").doc(connection.linkId);
      let assessmentSnap = await assessmentRef.get();
      if (assessmentSnap.exists) {
        let assessment = assessmentSnap.data();
        let updateData = {
          type: "created-assessment",
          assessment: assessment,
          authorId: connection.authorId,
          createdAt: snap['_createTime']._seconds,
          connectionId: snap.id,
          connectionSourceId: connection.sourceId,
          connectionLinkId: connection.linkId,
          connectionSourceType: connection.sourceType,
          connectionLinkType: connection.linkType,
          connectionType: connection.type,
        };
  
        await db.collection("updates").add(updateData);
      }
    }
  });

