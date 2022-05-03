<script>
  import { t } from "svelte-intl-precompile";

  export function calculate(lowLevelDataSet) {
    let goals = new Map();
    for (let i = 0; i < lowLevelDataSet.length; i++) {
      let lowLevelData = lowLevelDataSet[i];
      if (
        lowLevelData.type === "exercise" &&
        lowLevelData.exerciseAttemptNumber === 1
      ) {
        let goalId = lowLevelData.goalId;
        let exerciseName = lowLevelData.activityTitle;
        if (lowLevelData.isInterruption) {
          exerciseName +=
            ": " + $t("interruption") + " " + lowLevelData.interruptionId;
        }
        let exercise = {
          name: exerciseName,
          activityId: lowLevelData.activityId,
          firstAttemptResult: lowLevelData.exerciseIsCorrect,
        };
        let goal;
        if (!goals.has(goalId)) {
          goal = {
            studentExercises: new Map(),
          };
        } else {
          goal = goals.get(goalId);
        }
        if (!goal.studentExercises.has(lowLevelData.studentId)) {
          goal.studentExercises.set(lowLevelData.studentId, [exercise]);
        } else {
          let studentExercises = goal.studentExercises.get(
            lowLevelData.studentId
          );
          studentExercises.push(exercise);
          goal.studentExercises.set(lowLevelData.studentId, studentExercises);
        }
        goals.set(goalId, goal);
      }
    }

    let modelData = {
      headings: [
        $t("student-id"),
        $t("exercise"),
        $t("x"),
        $t("result"),
        $t("p-learned"),
      ],
      rows: [],
    };

    goals.forEach((goal, goalId) => {
      goal.studentExercises.forEach((exercises, studentId) => {
        let pK = 0.2;
        let pT = 0.05;
        let pS = 0.4;
        let pG = 0.3;
        let pNm1 = pK;
        let x = 1;
        for (let i = 0; i < exercises.length; i++) {
          let exercise = exercises[i];
          let pNm1A;
          let result = $t("correct");
          if (exercise.firstAttemptResult) {
            pNm1A = (pNm1 * (1 - pS)) / (pNm1 * (1 - pS) + (1 - pNm1) * pG);
          } else {
            result = $t("incorrect");
            pNm1A = (pNm1 * pS) / (pNm1 * pS + (1 - pNm1) * (1 - pG));
          }
          let pL = pNm1A + (1 - pNm1A) * pT;
          pNm1 = pL;
          let activityId = exercise.activityId
          let exerciseName =
            '<a class="text-indigo-600 hover:text-indigo-900" href="/activiteit/' +
            activityId +
            '">' +
            exercise.name +
            "</a>";

          modelData.rows.push([studentId, exerciseName, result, pL.toFixed(2)]);

          exercises[i] = {
            x: x,
            y: pL,
            name: exerciseName,
            activityId: activityId,
          };
          x = x + 1;
        }
      });
    });
    modelData.goals = goals;
    return modelData;
  }
</script>
