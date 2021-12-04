<script>
  import ShowMap from "$lib/Map/show.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import ModuleTeaserList from "$lib/Module/teaserList.svelte";
  // import firebase from "firebase/app";
  import { initFirebase } from "$lib/firebase";
  import { getMap, getUserMap } from "$lib/Map/helper";

  let firebase;
  let map;
  let mounted = false;
  let modules = null;
  let mapId = null;

  // $: async () => {
  //   if ($session.player) {
  //     mapId = $session.player.currentMapId;
  //     map = await getMap(firebase, mapId);
  //     userMap = await getUserMap(firebase, mapId, map, $session.player);
  //   }
  // };

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveAllModules();
    // if ($session.player) {
    //   mapId = $session.player.currentMapId;
    //   map = await getMap(firebase, mapId);
    //   userMap = await getUserMap(firebase, mapId, map, $session.player);
    // }
    mounted = true;
  });

  async function retrieveAllModules() {
    let db = firebase.firestore();
    let collectionRef = db.collection("modules");
    let querySnapshot = await collectionRef.get();
    modules = [];
    querySnapshot.docs.map((doc) => {
      let module = doc.data();
      module.moduleId = doc.id;
      modules = [...modules, module];
    });
  }
</script>

<svelte:head>
  <title>Naabu</title>
</svelte:head>

{#if mounted}
  <ModuleTeaserList bind:modules />
{:else}
  loading...
{/if}

<!-- {#if mounted && $session.player && map && userMap}
    <ShowMap bind:map bind:userMap />
  {/if} -->
<style>
  /* section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  } */
</style>
