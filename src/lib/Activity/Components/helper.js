import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";

export function getDefaultEmptyActivity() {
  return {
    title: "",
    descriptionRaw: "",
    status: "draft",
    description: "",
    type: "",
    difficulty: 1,
    svg: "",
    video: {
      vimeoId: null,
    },
    quizzes: [],
    plugins: [],
  };
}

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
    video: {
      vimeoId: activity.video.vimeoId,
    },
  };
  return data;
}

export function getTypeText(theType, $t) {
  switch (theType) {
    case "explanation":
      return $t("explanation");
    case "practice":
      return $t("practice");
    case "boss":
      return $t("boss");
  }
  return $t("no-type");
}

export function getDifficultyToString(difficulty, $t) {
  switch (difficulty) {
    case 1:
      return $t("very-easy");
    case 2:
      return $t("easy");
    case 3:
      return $t("not-easy-not-difficult");
    case 4:
      return $t("difficult");
    case 5:
      return $t("very-difficult");
  }
}

export function getStatusTranslation(status, $t) {
  switch (status) {
    case "draft":
      return $t("draft");
    case "open":
      return $t("open");
    case "published":
      return $t("published");
  }
  return $t("no-status");
}

export async function retrieveActivityListFB(db, status, authorId) {
  let ref;
  if (status && authorId) {
    ref = db
      .collection("activities")
      .where("status", "==", status)
      .where("authorId", "==", authorId)
      .orderBy("latestRevisionCreatedAt", "desc");
  } else if (status) {
    ref = db
      .collection("activities")
      .where("status", "==", status)
      .orderBy("latestRevisionCreatedAt", "desc");
  } else if (authorId) {
    ref = db
      .collection("activities")
      .where("authorId", "==", authorId)
      .orderBy("latestRevisionCreatedAt", "desc");
  } else {
    return [];
  }

  let snapshot = await ref.get();
  let activities = [];
  snapshot.forEach((doc) => {
    let activity = doc.data();
    activity.id = doc.id;
    activities.push(activity);
  });
  return activities;
}
