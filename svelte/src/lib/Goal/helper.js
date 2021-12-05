export function getGoalSaveData(goal, timestamp) {
  let addLeerdoelen = [];

  for (let i = 0; i < goal.goalLinks.length; i++) {
    let toAdd = {};
    toAdd.objectID = goal.goalLinks[i].objectID;
    toAdd.taxonomy_solo = goal.goalLinks[i].taxonomy_solo;
    toAdd.taxonomy_bloom = goal.goalLinks[i].taxonomy_bloom;
    toAdd.title = goal.goalLinks[i].title;
    addLeerdoelen = [...addLeerdoelen, toAdd]
  }

  const data = {
    title: goal.title,
    goalLinks: addLeerdoelen,
    description: goal.description,
    taxonomy_solo: goal.taxonomy_solo,
    taxonomy_bloom: goal.taxonomy_bloom,
    unitopic: goal.unitopic,
    context: goal.context,
    multitopics: goal.multitopics,
    selectedVerbs: goal.selectedVerbs,
    fromText: goal.fromText,
    createdAt: timestamp,
  };

  return data;
}

export function getDefaultGoalBreadcrumbs(goal) {
  return [
    {
      url: "/curriculum",
      value: "Curriculum",
    },
    {
      url: "/leerdoel/" + goal.id,
      value: "Leerdoel: " + goal.title,
    }
  ];
}

export async function createGoalRevision(db, goal, data, uid, firebase) {
  // Get profile from authorId.
  let profileRef = db.collection("curriculumProfile").doc(data.authorId);

  let snap = await profileRef.get();
  if (snap.exists) {
    let profileData = snap.data();
    data.curriculumProfile = {
      fullname: profileData.fullname,
      institution: profileData.institution
    }
  }

  data.revisionType = "goal";
  data.revisionCreatedAt = firebase.firestore.Timestamp.now().seconds;
  data.revisionSourceId = data.goalId;
  data.revisionAuthorId = uid;


  console.log(data);
  let revisionResult = await db.collection("revisions").add(data);
  for (let i = 0; i < goal.battles.length; i++) {
    let battleDocRef = db.doc(
      "/revisions/" +
      revisionResult.id +
      "/battles/" +
      goal.battles[i].name
    );
    let battleData = {
      quizzes: goal.battles[i].quizzes,
    };

    await battleDocRef.set(battleData);
  }
  return revisionResult;
}
