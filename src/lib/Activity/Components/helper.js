import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
import { loadPluginRecursively } from "$lib/Internals/Plugin/loader";

export function getDefaultEmptyActivity(title = "") {
  return {
    title: title,
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

export async function loadPluginData(id, snap, loadComponent = "render") {
  if (snap.exists) {
    let object = snap.data();
    object.id = id;

    if (object.plugins) {
      object.plugins = JSON.parse(object.plugins);

      let loadPluginsObject = {
        plugins: object.plugins,
      };
      await loadPluginRecursively(loadPluginsObject, loadComponent);
      object.plugins = loadPluginsObject.plugins;
      for (let i = 0; i < object.plugins.length; i++) {
        object.plugins[i].currentPlugin = object.plugins[i];
      }
    }
    return object;
  }
  return null;
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

export async function retrieveActivityListFB(db, authorId) {
  let ref;
  if (authorId) {
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
