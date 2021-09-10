<script>
  import ActivityChoiceList from "$lib/ActivityChoice/list.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { getMap, getUserMap } from "$lib/Map/helper";

  let firebase;

  let map;
  let userMap = null;

  $: if ($session.player && mounted) {
    retrieveFirestoreData();
  }

  let displayActivities = [];


  let mounted = false;
  let breadcrumbs = [
    {
      url: "/kaart/" + $page.params.mapId,
      value: "Kaart",
    },
    {
      url:
        "/kaart/" + $page.params.mapId + "/locatie/" + $page.params.lociationId,
      value: "Locatie <CHANGE THIS>",
    },
  ];

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let mapId = $page.params.mapId
    let locationId = $page.params.locationId;
    map = await getMap(firebase, mapId);
    userMap = await getUserMap(firebase, mapId, map, $session.player);
    if (userMap && userMap.selectedActivities) {
      displayActivities = userMap.selectedActivities;
    }
  }
</script>

{#if mounted}
  <ActivityChoiceList bind:activities={displayActivities} /> 
{/if}
