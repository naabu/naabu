<script>
  import EditGoal from "$lib/Goal/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";

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
    if (firebaseInitialized && !mounted) {
      mounted = true;
      let db = await firebase.firestore();
      goalRef = db.collection("goals").doc($page.params.id);
      let goalSnap = await goalRef.get();
      if (goalSnap.exists) {
        goal = goalSnap.data();
        goal.id = goalRef.id;
        if (!goal.goalLinks) {
          goal.goalLinks = [];
        }
        if (!goal.unitopic) {
          goal.unitopic = "";
        }
        if (!goal.multitopics) {
          goal.multitopics = [];
        }
        if (!goal.context) {
          goal.context = "";
        }
        if (!goal.selectedVerbs) {
          goal.selectedVerbs = [];
        }
        if (!goal.fromText) {
          goal.fromText = "";
        }
        if (!goal.battles) {
          goal.battles = [];
        }
      }
      battleCol = db.collection("goals/" + $page.params.id + "/battles");
      const querySnapshot = await battleCol.get();
      querySnapshot.forEach((doc) => {
        let battleObject = doc.data();
        battleObject.name = doc.id;
        goal.battles = [...goal.battles, battleObject];
      });
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
