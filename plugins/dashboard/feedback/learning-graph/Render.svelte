<script>
  import * as Pancake from "@sveltejs/pancake";
  import { t } from "svelte-intl-precompile";
  import sanitizeHtml from 'sanitize-html';
  import { goto } from "$app/navigation";

  export let modelData;
  let x1 = 1;
  let x2 = 2;
  let y1 = 0;
  let y2 = 1;

  let closest;

  let students;

  $: {
    students = [];

    modelData.goals.forEach(function (goal, goalId) {
      goal.studentExercises.forEach(function (exercises, studentId) {
        let student = {
          name: studentId,
          data: [],
        };
        for (let i = 0; i < exercises.length; i++) {
          let exercise = exercises[i];
          student.data.push(exercise);
        }
        if (x2 < exercises.length) {
          x2 = exercises.length;
        }
        students.push(student);
      });
    });
  }

  $: points = students.reduce((points, student) => {
    return points.concat(
      student.data.map((d) => ({
        x: d.x,
        y: d.y,
        exerciseName: d.name,
        activityId: d.activityId,
        student,
      }))
    );
  }, []);

  function goToActivity() {
    goto("/activiteit/" + closest.activityId);
  }
</script>

<!-- <input placeholder="Type to filter" bind:value={filter} /> -->

<div class="chart">
  <Pancake.Chart {x1} {x2} {y1} {y2}>
    <Pancake.Grid horizontal count={5} let:value>
      <div class="grid-line horizontal"><span>{value}</span></div>
    </Pancake.Grid>

    <Pancake.Grid vertical count={5} let:value>
      <span class="x-label">{value}</span>
    </Pancake.Grid>

    <Pancake.Svg>
      {#each students as student}
        <Pancake.SvgLine data={student.data} let:d>
          <path class="data" {d} />
        </Pancake.SvgLine>
      {/each}

      {#if closest}
        <Pancake.SvgLine data={closest.student.data} let:d>
          <path class="highlight" {d} />
        </Pancake.SvgLine>
      {/if}
    </Pancake.Svg>

    {#if closest}
      <span on:click={goToActivity}>
        <Pancake.Point x={closest.x} y={closest.y}>
          <span class="annotation-point" />
          <div
            class="annotation"
            style="transform: translate(-{100 *
              ((closest.x - x1) / (x2 - x1))}%,0)"
          >
            <strong>{@html sanitizeHtml(closest.exerciseName)}</strong>
            <span>{closest.y.toFixed(2)} {$t("learning")}</span>
          </div>
        </Pancake.Point>
      </span>
    {/if}

    <Pancake.Quadtree data={points} bind:closest />
  </Pancake.Chart>
</div>

<style>
  .chart {
    height: 400px;
    padding: 3em 0 2em 2em;
    margin: 0 0 36px 0;
  }
  .grid-line {
    position: relative;
    display: block;
  }
  .grid-line.horizontal {
    width: calc(100% + 2em);
    left: -2em;
    border-bottom: 1px dashed #ccc;
  }
  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
  }
  .x-label {
    position: absolute;
    width: 4em;
    left: -2em;
    bottom: -22px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  path.data {
    stroke: rgba(0, 0, 0, 0.2);
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 1px;
    fill: none;
  }
  .highlight {
    stroke: #ff3e00;
    fill: none;
    stroke-width: 2;
  }
  .annotation {
    position: absolute;
    white-space: nowrap;
    bottom: 1em;
    line-height: 1.2;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.2em 0.4em;
    border-radius: 2px;
  }
  .annotation-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #ff3e00;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .annotation strong {
    display: block;
    font-size: 20px;
  }
  .annotation span {
    display: block;
    font-size: 14px;
  }
</style>
