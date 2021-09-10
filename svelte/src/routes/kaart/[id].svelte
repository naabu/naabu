<script>
  import Show from "$lib/Map/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { getMap, getUserMap } from "$lib/Map/helper";

  let firebase;
  let map;
  let userMap = null;
  let mapId = $page.params.id;

  $: (async () => {
    if ($session.player) {
      userMap = await getUserMap(firebase, mapId, map, $session.player);
    }
  });



  let mounted = false;
  let breadcrumbs = [
    {
      url: "/",
      value: "Reis",
    },
    {
      url: "/kaart/" + $page.params.id,
      value: "Kaart bekijken",
    },
  ];

  $: if ($session.player && firebase) {
    asynGetUserMap();
  }

  const asynGetUserMap = async () => {
    userMap = await getUserMap(firebase, mapId, map, $session.player);
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    await asynGetUserMap();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let mapId = $page.params.id;
    map = await getMap(firebase, mapId);
  }
</script>

{#if mounted}
  <Show bind:map bind:userMap />
{/if}
