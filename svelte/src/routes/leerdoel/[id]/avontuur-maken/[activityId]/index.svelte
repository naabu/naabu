<script>
  import AdventureCreatePreviewActivity from "$lib/Goal/Adventure/previewActivity.svelte";
  import ConnectionTemplate from "$lib/Containers/connectionTemplate.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let firebase;
  let goal;
  let activity;
  let breadcrumbs;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let activityRef = db.collection("activities").doc($page.params.activityId);
    let activitySnap = await activityRef.get();
    if (activitySnap.exists) {
      activity = activitySnap.data();
      activity.id = activityRef.id;
    }
  }
  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/avontuur-maken",
        value: "Avontuur maken, activiteit zoeken",
      },
      {
        url: $page.path,
        value: "Activiteit bekijken",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  {#if activity}
    <AdventureCreatePreviewActivity bind:firebase bind:goal bind:activity />
  {/if}
</ConnectionTemplate>
