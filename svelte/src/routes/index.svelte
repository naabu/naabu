<!-- <script context="module" >
  import { initFirebase } from "$lib/firebase";

  export async function load({session}) {
    let firebase = await initFirebase(session.environment);
    return {
      props: {
        firebase: firebase
      },
    };
  }
</script> -->
<script>
  import ShowMap from "$lib/Map/show.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  // import firebase from "firebase/app";
  import { initFirebase } from "$lib/firebase";
  import { getMap, getUserMap } from "$lib/Map/helper";

  let firebase;
  let map;
  let mounted = false;
  let userMap = null;
  let mapId = null;

  $: async () => {
    if ($session.player) {
      mapId = $session.player.currentMapId;
      map = await getMap(firebase, mapId);
      userMap = await getUserMap(firebase, mapId, map, $session.player);
    }
  };

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    if ($session.player) {
      mapId = $session.player.currentMapId;
      map = await getMap(firebase, mapId);
      userMap = await getUserMap(firebase, mapId, map, $session.player);
    }
    mounted = true;
  });
</script>

<svelte:head>
  <title>Kies je pad</title>
</svelte:head>

<section>
  {#if mounted && $session.player && map && userMap}
    <ShowMap bind:map bind:userMap />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>
