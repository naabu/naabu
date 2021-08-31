<script>
  import Show from "$lib/Map/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { getMap, getUserMap } from "$lib/Map/helper";

  let firebase;

  let map;
  let userMap = null;

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

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let mapId = $page.params.id
    map = await getMap(firebase, mapId);
    userMap = await getUserMap(firebase, mapId, $session.player);
  }
</script>

{#if mounted}
  <Show bind:map bind:userMap />
{/if}
