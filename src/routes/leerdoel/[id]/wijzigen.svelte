<script>
  import EditGoal from "$lib/Goal/Components/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { t } from "svelte-intl-precompile";

 
  let goalMounted = false;
  let battleCol;
  let mounted = false;
  let goal;
  let previousBattles;
  Initialized = false;

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
     $firebaseInitialized = true;
    }
  })();

  $: (async () => {
    if (firebaseInitialized && goal && !mounted) {
      mounted = true;
      let db = await $firebase.firestore();
      battleCol = db.collection("goals/" + $page.params.id + "/battles");
      const querySnapshot = await battleCol.get();
      if (!goal.battles) {
        goal.battles = [];
      }
      querySnapshot.forEach((doc) => {
        let battleObject = doc.data();
        battleObject.name = doc.id;
        goal.battles = [...goal.battles, battleObject];
      });
      previousBattles = [...goal.battles];
    }
    else if (!goal && goalMounted && !mounted) {
      mounted = true;
    }
  })();

  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = [
      {
        url: "/curriculum",
        value: $t("curriculum"),
      },
      {
        url: "/leerdoel/" + goal.id,
        value: $t("goal") + ": " + goal.title,
      },
      {
        url: $page.url.pathname,
        value: $t("edit"),
      },
    ];
  }
</script>

<GetGoalData bind:mounted={goalMounted}  bind:goal />
{#if mounted}
  {#if goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <EditGoal
    bind:goal
    bind:previousBattles
    bind:battleCol
    
  />
  {:else}
    {$t("goals-not-found")}
  {/if}
{:else}
  {$t("loading")}
{/if}
