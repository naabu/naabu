<script>
  import EditGoal from "$lib/Goal/Components/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";

  let firebase;

  let goalRef;
  let battleCol;
  let mounted = false;
  let goal;
  let previousBattles;
  let firebaseInitialized = false;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      firebaseInitialized = true;
      // mounted = true;
    }
  })();

  $: (async () => {
    if (firebaseInitialized && goal && !mounted) {
      mounted = true;
      let db = await firebase.firestore();
      battleCol = db.collection("goals/" + $page.params.id + "/battles");
      const querySnapshot = await battleCol.get();
      querySnapshot.forEach((doc) => {
        let battleObject = doc.data();
        battleObject.name = doc.id;
        goal.battles = [...goal.battles, battleObject];
      });
      console.log(goal.battles);
      if (!goal.battles) {
        goal.battles = [];
      }
      console.log(goal.battles);
      previousBattles = [...goal.battles];
    }
  })();

  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = [
      {
        url: "/curriculum",
        value: "Curriculum",
      },
      {
        url: "/leerdoel/" + goal.id,
        value: "Leerdoel: " + goal.title,
      },
      {
        url: $page.path,
        value: "Wijzigen",
      },
    ];
  }
</script>

<GetGoalData bind:firebase bind:goal />

{#if goal && mounted}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <EditGoal
    bind:goalRef
    bind:goal
    bind:previousBattles
    bind:battleCol
    bind:firebase
  />
{:else}
  Loading...
{/if}
