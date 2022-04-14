<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as knobby from "svelte-knobby";
  import { spring } from "svelte/motion";
  import Wall from "./Wall.svelte";
  import { createBall, update, SIZE } from "./custom-physics.js";
  import { t } from "svelte-intl-precompile";
  import Button from "$lib/Internals/Button/Button.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const target = spring();
  export let answer;
  let viewOffset;
  let balls = [];
  let tryNumberOfBalls = 1;
  let successAlert = {
    success: true,
    successTitle: $t("right-answer-is") + answer,
    successMessage: $t("success-exercise"),
    successCanClose: false,
  };

  $: if (hasEstimation) {
    let estimationBalls = Math.pow(2, estimation);
    let message = "";
    if (estimation > 29) {
      message =
        $t("with-your-estimation-of") +
        estimation +
        " " +
        $t("steps-short") +
        $t("it-would-generate") +
        estimationBalls +
        " " +
        $t("balls").toLowerCase() +
        "! </br>" +
        $t("if-balls-size-ping-pong-ball-it-would-fill-the") +
        " ";
    }
    if (estimation > 280) {
      message += $t("fill-size-of-universe");
    }
    else if (estimation > 195) {
      message += $t("the-milky-way");
    }
    else if (estimation > 103) {
      message += $t("the-sun");
    } else if (estimation > 80) {
      message += $t("fill-world");
    }
    else if (estimation > 29) {
      message += $t("boeing-everett-factory");
    } else if (answer == estimation) {
      message = $t("perfect-estimation");
    } else {
      message = $t("pretty-close-estimation");
    }
    successAlert.successMessage = message;
  }

  let checkFramesLimit = 60;
  let checkFramesCount = 0;
  let cubeFull = false;
  let numberOfSteps = 0;
  let hasEstimation = false;
  let estimation = 1;
  let userAnswer = 1;
  let showFinalFeedback = false;

  function reset() {
    balls = [];
    tryNumberOfBalls = 1;
    numberOfSteps = 0;
    cubeFull = false;
    checkFramesCount = 0;
  }

  function multiply() {
    tryNumberOfBalls = tryNumberOfBalls * 2;
    numberOfSteps = numberOfSteps + 1;
  }

  function addControls() {
    hasEstimation = true;
  }

  function simulationComplete() {
    reset();
    hasEstimation = false;
    hasEstimation = false;
    dispatch("end");
  }

  function addFinalFeedback() {
    showFinalFeedback = true;
  }

  function addBalls() {
    if (checkFramesCount > checkFramesLimit) {
      cubeFull = true;
    }
    checkFramesCount++;

    if (checkFramesCount % 5 === 0) {
      for (let i = 0; i < 20; i++) {
        if (balls.length < tryNumberOfBalls) {
          let newBall = createBall(balls);
          if (newBall !== null) {
            balls = [...balls, newBall];
            checkFramesCount = 0;
          }
        }
      }
    }
  }

  const sphere = new THREE.SphereGeometry(1, 32, 32);

  const material = new THREE.MeshMatcapMaterial();
  SC.onFrame(() => {
    if (!cubeFull && balls.length < tryNumberOfBalls) {
      addBalls();
    }
    if (balls) {
      balls = update(balls);
    }
  });
</script>

<div>
  {#if hasEstimation}
    <div>
      {$t("your-estimation")}: {estimation}
      {$t("steps-short")}
    </div>
  {/if}
  <div>
    {$t("steps")}: {numberOfSteps}
  </div>
  <div>
    {$t("number-of-balls")}: {balls.length}
    {$t("of") + " " + tryNumberOfBalls}
  </div>
</div>

{#if hasEstimation}
  <Button
    content={$t("multiply")}
    color="primary"
    size="large"
    on:click={multiply}
  />
  <Button content={$t("reset")} size="large" on:click={reset} />

  {#if cubeFull && !showFinalFeedback}
    <FormField title={$t("what-is-good-answer")} forId="realanswer">
      <NumberInput min="1" max="300" id="realanswer" bind:value={userAnswer} />
      <Button content={$t("check")} on:click={addFinalFeedback} />
    </FormField>
  {:else if showFinalFeedback}
    <ResultFeedback bind:alert={successAlert} />
    <Button content={$t("continue")} on:click={simulationComplete}/>
  {/if}

  <div>
    {#if cubeFull}
      {$t("cube-full")}
    {:else}
      {$t("cube-not-full")}
    {/if}
  </div>
{:else}
  <FormField title={$t("give-estimation")} forId="estimation">
    <NumberInput min="1" max="300" id="estimation" bind:value={estimation} />
    <Button content={$t("check")} on:click={addControls} />
  </FormField>
{/if}

<SC.Canvas
  width="700"
  height="500"
  antialias
  background={new THREE.Color("papayawhip")}
  fog={new THREE.FogExp2(0, 0.0001)}
>
  <!-- floor and ceiling -->
  <Wall position={[0, -SIZE, 0]} rotation={[0, 0, 0]} />
  <Wall position={[0, +SIZE, 0]} rotation={[Math.PI, 0, 0]} />

  <!-- left and right -->
  <Wall position={[-SIZE, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
  <Wall position={[+SIZE, 0, 0]} rotation={[0, 0, Math.PI / 2]} />

  <!-- back and front -->
  <Wall position={[0, 0, -SIZE]} rotation={[Math.PI / 2, 0, 0]} />
  <Wall position={[0, 0, +SIZE]} rotation={[-Math.PI / 2, 0, 0]} />

  {#each balls as bal}
    <SC.Mesh geometry={sphere} {material} position={bal.coords} scale={0.5} />
  {/each}

  <SC.PerspectiveCamera position={[-20, 20, 40]} bind:viewOffset />
  <SC.OrbitControls
    target={$target}
    enableZoom={true}
    enablePan={false}
    enableDamping
  />

  <SC.AmbientLight intensity={0.2} />
</SC.Canvas>
