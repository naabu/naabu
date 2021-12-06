<script>
  import ShowAdventure from "$lib/Goal/Adventure/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import ConnectionTemplate from "$lib/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let firebase;
  let goal;
  let adventureRef;
  let adventure;
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
    adventureRef = db
      .collection("goals")
      .doc($page.params.id)
      .collection("adventures")
      .doc($page.params.adventureId);
    let adventureSnap = await adventureRef.get();
    if (adventureSnap.exists) {
      adventure = adventureSnap.data();
      adventure.id = adventureRef.id;
      let activityId = adventure.activityId;
      let activityRef = db.collection("activities").doc(activityId);
      let activitySnap = await activityRef.get();
      if (activitySnap.exists) {
        activity = activitySnap.data();
        activity.id = activityId;
      }
    }
  }

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/avonturen",
        value: "Activiteiten",
      },
      {
        url:
          "/leerdoel/" +
          goal.id +
          "/avontuur/" +
          $page.params.adventureId +
          "/work",
        value: "Advontuur pagina",
      },
      {
        url: $page.path,
        value: "Activiteit bekijken",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  {#if activity && adventure}
    <ShowAdventure bind:firebase bind:goal bind:adventure bind:activity />
  {/if}
</ConnectionTemplate>
