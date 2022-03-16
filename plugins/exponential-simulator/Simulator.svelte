<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as knobby from "svelte-knobby";
  import { spring } from "svelte/motion";
  import Wall from "./Wall.svelte";
  import { center_of_mass, create_star, SIZE } from "./astrophysics.js";
  import { createBall, update } from "./custom-physics.js";
  import { t } from "svelte-intl-precompile";
  import Button from "$lib/Internals/Button/Button.svelte";

  const target = spring();
  let viewOffset;
  let balls = [];
  let tryNumberOfBalls = 1;

  let checkFramesLimit = 300;
  let checkFramesCount = 0;
  let cubeFull = false;
  let numberOfSteps = 0;


  function reset() {
    balls = [];
    tryNumberOfBalls = 1;
    numberOfSteps = 0;
  }

  function multiply() {
    tryNumberOfBalls = tryNumberOfBalls * 2;
    numberOfSteps = numberOfSteps + 1;
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
  <div>
    {$t("steps")}: {numberOfSteps}
  </div>
  <div>
    {$t("number-of-balls")}: {balls.length}
    {$t("of") + " " + tryNumberOfBalls}
  </div>
</div>

<Button content={$t("multiply")} color="primary" size="large" on:click={multiply} />
<Button content={$t("reset")} size="large" on:click={reset} />

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
