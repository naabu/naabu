import { renderKatexOutput } from "$lib/Misc/helper.js";

export function getActivitySaveData(activity) {
  activity.description = renderKatexOutput(activity.descriptionRaw);
  const data = {
    goalId: activity.goalId,
    goalTitle: activity.goalTitle,
    title: activity.title,
    descriptionRaw: activity.descriptionRaw,
    description: activity.description,
    type: activity.type,
    difficulty: activity.difficulty,
    svg: activity.svg,
    quizzes: activity.quizzes,
    status: activity.status,
    visibility: 'public',
    video: {
      vimeoId: activity.video.vimeoId
    }
  };
  return data;
}

export function getTypeText(theType) {
  switch (theType) {
    case "explanation":
      return "Uitleg";
    case "practice":
      return "Oefening";
    case "boss":
      return "Eindbaas";
  }
  return "Geen type";
}

export function getDifficultyToString(difficulty) {
  switch (difficulty) {
    case 1:
      return "Heel makkelijk";
    case 2:
      return "Makkelijk";
    case 3:
      return "Niet makkelijk, niet moeilijk";
    case 4:
      return "moeilijk";
    case 5:
      return "Heel moeilijk";
  }
}

export async function retrieveActivityListFB(db, status, authorId) {
  console.log(status);
  console.log(authorId);

  let ref;
  if (status && authorId) {
    ref = db.collection("activities").where("status", "==", status).where("authorId", "==", authorId);;
  }
  else if (status) {
    ref = db.collection("activities").where("status", "==", status);
  }
  else if (authorId) {
    ref = db.collection("activities").where("authorId", "==", authorId);
  }
  else {
    return [];
  }

  let snapshot = await ref.get();
  let activities = [];
  snapshot.forEach(doc => {
    let activity = doc.data();
    activity.id = doc.id;
    activities.push(activity);
  });
  return activities;
}