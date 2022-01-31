<script>
  import ShowMap from "$lib/Module/Map/Components/show.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import ModuleTeaserList from "$lib/Module/Components/teaserList.svelte";
  // import firebase from "firebase/app";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getMap, getUserMap } from "$lib/Module/Map/Components/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Radio from "$lib/Internals/FormFields/Radio.svelte";

  let firebase;
  let map;
  let mounted = false;
  let modules = null;
  let mapId = null;

  export let radioDefaultValue = "map";

  // $: async () => {
  //   if ($session.player) {
  //     mapId = $session.player.currentMapId;
  //     map = await getMap(firebase, mapId);
  //     userMap = await getUserMap(firebase, mapId, map, $session.player);
  //   }
  // };

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveAllModules();
      // if ($session.player) {
      //   mapId = $session.player.currentMapId;
      //   map = await getMap(firebase, mapId);
      //   userMap = await getUserMap(firebase, mapId, map, $session.player);
      // }
      mounted = true;
    }
  })();

  async function retrieveAllModules() {
    let db = firebase.firestore();
    let collectionRef = db.collection("modules");
    let querySnapshot = await collectionRef.get();
    modules = [];
    querySnapshot.docs.map((doc) => {
      let module = doc.data();
      module.id = doc.id;
      modules = [...modules, module];
    });
  }
</script>

<svelte:head>
  <title>Naabu</title>
</svelte:head>

<Radio
  bind:selectedValue={radioDefaultValue}
  options={[
    {
      label: "Map",
      value: "map",
    },
    {
      label: "Module",
      value: "module",
    },
  ]}
/>

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
