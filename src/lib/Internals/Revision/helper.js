import { getTypeText, getDifficultyToString, getStatusTranslation } from "$lib/Activity/Components/helper.js";

function compareCreatedAt(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 0;
}

export function sortOnCreatedAt(list) {
  list.sort(compareCreatedAt);
}

function compareLastReplyAt(a, b) {
  if (a.lastReplyAt < b.lastReplyAt) {
    return 1;
  }
  if (a.lastReplyAt > b.lastReplyAt) {
    return -1;
  }
  return 0;
}

export function sortOnLastReplyAt(list) {
  list.sort(compareLastReplyAt);
}

export async function queryRevisions(db, type, sourceId) {
  let ref = db.collection("revisions").where("revisionSourceId", "==", sourceId).where("revisionType", "==", type).orderBy("revisionCreatedAt", "desc");
  let snapshot = await ref.get();
  let revisions = [];
  snapshot.forEach(doc => {
    let revision = doc.data();
    revision.revisionId = doc.id;
    revisions.push(revision);
  });
  return revisions;
}

export function getActivitySort() {
  return [
    "status",
    "type",
    "goalTitle",
    "title",
    "descriptionRaw",
    "difficulty",
    "video",
    "quizzes",
  ];
}

export function getDifferencesBetweenRevisions(revision1, revision2, sortListOrder = []) {
  let diff = [];
  diff = getDifferencesBetweenRevisionsRecursive(diff, revision1, revision2);
  let ignoreList = [
    "revisionId",
    "previousRevisionId",
    "revisionCreatedAt",
    "description",
    "revisionAuthorId",
    "revisionSourceId",
    "revisionType",
    "goalId",
    "id",
    "authorId",
    "status",
    "latestRevisionId",
    "latestRevisionCreatedAt",
    "svg",
    "connectionStatus",
    "connectionId",
  ]
  for (let i = 0; i < diff.length; i++) {
    let ignore = false;
    for (let j = 0; j < ignoreList.length; j++) {
      if (diff[i].keys.includes(ignoreList[j])) {
        ignore = true;
        break;
      }
    }
    if (ignore) {
      diff.splice(i, 1);
      i--;
    }
  }

  if (sortListOrder.length === 0) {
    return diff;
  }

  let orderedDifference = [];
  let foundIndexes = [];
  for (let i = 0; i < sortListOrder.length; i++) {
    let key = sortListOrder[i];
    for (let i2 = 0; i2 < diff.length; i2++) {
      let difference = diff[i2];
      if (difference.keys[0] === key) {
        orderedDifference.push(difference);
        foundIndexes.push(i2);
      }
    }
  }

  // Include the rest that is not in the ordering.
  for (let i = 0; i < diff.length; i++) {
    if (!foundIndexes.includes(i)) {
      orderedDifference.push(diff[i]);
    }
  }

  return orderedDifference;
}


export function formatActivityValue(difference, value, $t) {
  if (value === "") {
    return value;
  }
  if (difference.keys[difference.keys.length - 1] === "type") {
    return getTypeText(value, $t);
  }
  if (difference.keys[difference.keys.length - 1] === "difficulty") {
    return getDifficultyToString(value, $t);
  }
  if (difference.keys[difference.keys.length - 1] === "status") {
    return getStatusTranslation(value, $t);
  }
  if (value === false) {
    return $t("no");
  }
  if (value === true) {
    return $t("yes");
  }
  if (!value) {
    return "";
  }
  return value;
}

export function formatActivityKeys(keys, $t) {
  let formatKeys = [];
  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case "descriptionRaw":
        formatKeys.push($t("description"));
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (keys[i - 1] === "quizzes") {
          formatKeys.push($t("question") + " " + (parseInt(keys[i]) + 1));
        }
        if (keys[i - 1] === "answers") {
          formatKeys.push($t("answer") + " " + (parseInt(keys[i]) + 1));
        }
        break;
      case "vimeoId":
        formatKeys.push($t("vimeo-id"));
        break;
      case "answers":
      case "answer":
        break;
      default:
        formatKeys.push($t(keys[i]));
        break;
      case "timeInVideo":
        formatKeys.push($t("time-in-video"));
        break;
      case "status":
        formatKeys.push($t("status"));
        break;
      case "correct":
        formatKeys.push($t("correct-answer"));
        break;
      case "goalTitle":
        formatKeys.push($t("goal"));
        break;
    }
  }
  return formatKeys.join(" - ") + ":";
}

function getDifferencesBetweenRevisionsRecursive(diff, value1, value2, keys = []) {
  if (typeof value1 === "object" && value1 !== null && typeof value2 === "object" && value2 !== null) {
    let keysOfObjects = []
    for (let key in value1) {
      if (!keysOfObjects.includes(key)) {
        keysOfObjects.push(key);
      }
    }
    for (let key in value2) {
      if (!keysOfObjects.includes(key)) {
        keysOfObjects.push(key);
      }
    }

    for (let index in keysOfObjects) {
      let key = keysOfObjects[index];
      let newKeys = [...keys, key];
      if (key in value1 && key in value2) {
        getDifferencesBetweenRevisionsRecursive(diff, value1[key], value2[key], newKeys);
      }
      else {
        if (key in value1) {
          getDifferencesBetweenRevisionsRecursive(diff, value1[key], null, newKeys);
        }
        else {

          getDifferencesBetweenRevisionsRecursive(diff, null, value2[key], newKeys);
        }

      }
    }
  }
  else if (typeof value1 === "object" && value1 !== null) {
    for (let key in value1) {
      let newKeys = [...keys, key];
      getDifferencesBetweenRevisionsRecursive(diff, value1[key], null, newKeys);
    }
  }
  else if (typeof value2 === "object" && value2 !== null) {
    for (let key in value2) {
      let newKeys = [...keys, key];
      getDifferencesBetweenRevisionsRecursive(diff, null, value2[key], newKeys);
    }
  }
  else if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length === value2.length) {
      for (let i = 0; i < value1.length; i++) {
        let newKeys = [...keys, i];
        getDifferencesBetweenRevisionsRecursive(diff, value1[i], value2[i], newKeys);
      }
    }
    else {
      diff.push({
        keys: keys,
        type: "array",
        oldValue: value1,
        newValue: value2
      });
    }
  }
  else if (Array.isArray(value1)) {
    for (let i = 0; i < value1.length; i++) {
      let newKeys = [...keys, i];
      getDifferencesBetweenRevisionsRecursive(diff, value1[i], null, newKeys);

    }
  }
  else if (Array.isArray(value2)) {
    for (let i = 0; i < value2.length; i++) {
      let newKeys = [...keys, i];
      getDifferencesBetweenRevisionsRecursive(diff, null, value2[i], newKeys);
    }
  }
  else if (value1 !== null && value2 === null) {
    diff.push({
      keys: keys,
      type: "string",
      oldValue: value1,
      newValue: ""
    });
  }
  else if (value1 === null && value2 !== null) {
    diff.push({
      keys: keys,
      type: "string",
      oldValue: "",
      newValue: value2
    });
  }
  else if (value1 === null && value2 === null) {
  }
  else if (value1 !== value2) {
    diff.push({
      keys: keys,
      type: "string",
      oldValue: value1,
      newValue: value2
    });
  }
  return diff;
}


export function getNextAndPreviousRevisions(revisionList, revisionId) {
  sortOnCreatedAt(revisionList);

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


export async function createRevision(firebase, activity, activitySaveData, userId) {
  let db = await $firebase.firestore();
  let revisionData = {
    revisionType: "activity",
    revisionCreatedAt:$firebase.firestore.Timestamp.now().seconds,
    revisionSourceId: activity.id,
    revisionAuthorId: userId,
  };

  if (activity.latestRevisionId) {
    revisionData.previousRevisionId = activity.latestRevisionId;
  }

  revisionData = { ...revisionData, ...activitySaveData };
  let resultRevision = await db.collection("revisions").add(revisionData);
  return resultRevision;
}
