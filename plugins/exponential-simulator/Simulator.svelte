<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as knobby from "svelte-knobby";
  import { spring } from "svelte/motion";
  import Wall from "./Wall.svelte";
  import { center_of_mass, create_star, update, SIZE } from "./astrophysics.js";

  const target = spring();
  let viewOffset;
  let balls = [create_star()];

	const sphere = new THREE.SphereGeometry(1, 32, 32);
	const material = new THREE.MeshStandardMaterial({ emissive: 0xffffdd });

  SC.onFrame(() => {
		balls = update(balls, 4);
    console.log(balls);
	});

</script>

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
    <SC.Mesh geometry={sphere} {material} position={bal.coords} scale={1} />
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
