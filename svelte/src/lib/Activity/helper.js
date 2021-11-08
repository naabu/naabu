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
    visibility: 'public',
    video: {
      vimeoId: activity.video.vimeoId
    }
  };
  return data;
}