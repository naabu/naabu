import { renderKatexOutput } from "$lib/Misc/helper.js";

export function getActivitySaveData(activity) {
  let addGoals = [];
  let goalIds = [];
    
  for (let i = 0; i < activity.goals.length; i++) {
    let toAdd = {};
    goalIds.push(activity.goals[i].objectID);
    toAdd.objectID = activity.goals[i].objectID;
    toAdd.taxonomy_solo = activity.goals[i].taxonomy_solo;
    toAdd.taxonomy_bloom = activity.goals[i].taxonomy_bloom;
    toAdd.title = activity.goals[i].title;
    addGoals = [... addGoals, toAdd]
  }
  activity.description = renderKatexOutput(activity.descriptionRaw);

  const data = {
    title: activity.title,
    goalIds: goalIds,
    goals: addGoals,
    descriptionRaw: activity.descriptionRaw,
    description: activity.description,
    type: activity.type,
    difficulty: activity.difficulty,
    svg: activity.svg,
    quizzes: activity.quizzes,
    visibility: 'public',
    video: {
      vimeoId: activity.video.vimeoId
    }
  };
  return data;
}