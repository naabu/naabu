<script>
  import { t } from "svelte-intl-precompile";

  export function calculate(lowLevelDataSet) {
    let exercises = new Map();
    for (let i = 0; i < lowLevelDataSet.length; i++) {
      let lowLevelData = lowLevelDataSet[i];
      if (lowLevelData.type === "exercise") {
        let exerciseId = lowLevelData.activityId;
        let exerciseName = lowLevelData.activityTitle;
        if (lowLevelData.isInterruption) {
          exerciseId += "_" + lowLevelData.interruptionId;
          exerciseName +=
            ": " + $t("interruption") + " " + lowLevelData.interruptionId;
        }
        if (!exercises.has(exerciseId)) {
          let exercise = {
            name: exerciseName,
            activityId: lowLevelData.activityId,
            uniqueStudents: new Map([[lowLevelData.studentId, 1]]),
            firstAttempts: [],
          };
          if (lowLevelData.exerciseAttemptNumber === 1) {
            exercise.firstAttempts.push(lowLevelData.exerciseIsCorrect);
          }
          exercises.set(exerciseId, exercise);
        } else {
          let exercise = exercises.get(exerciseId);
          if (!exercise.uniqueStudents.has(lowLevelData.studentId)) {
            exercise.uniqueStudents.set(lowLevelData.studentId, 1);
          }
          if (lowLevelData.exerciseAttemptNumber === 1) {
            exercise.firstAttempts.push(lowLevelData.exerciseIsCorrect);
          }
        }
      }
    }

    let modelData = {
      headings: [
        $t("exercise"),
        $t("number-of-unique-students"),
        $t("percentage-of-correct-at-first-try"),
        $t("total-first-attempts"),
      ],
      rows: [],
    };

    exercises.forEach((exercise, keys) => {
      let countCorrect = 0;
      for (let i = 0; i < exercise.firstAttempts.length; i++) {
        if (exercise.firstAttempts[i]) {
          countCorrect++;
        }
      }

      let percentageCorrent = parseInt(
        (countCorrect / exercise.firstAttempts.length) * 100
      );

      modelData.rows.push([
        '<a class="text-indigo-600 hover:text-indigo-900" href="/activiteit/' +
          exercise.activityId +
          '">' +
          exercise.name +
          "</a>",
        exercise.uniqueStudents.size,
        percentageCorrent + "%",
        exercise.firstAttempts.length,
      ]);
    });

    return modelData;
  }
</script>
