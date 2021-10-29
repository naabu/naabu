<script>
  import EditRevision from "$lib/Revision/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let firebase;
  let ref;
  let battleCol;
  let goal;
  let mounted = false;

  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.path,
        value: "Leerdoel wijzigen vanuit revisie",
      },
    ];
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    let db = await firebase.firestore();
    ref = db.collection("revisions").doc($page.params.id);
    battleCol = db.collection("revisions/" + $page.params.id + "/battles");
    let snap = await ref.get();
    if (snap.exists) {
      let revision = snap.data();
      revision.id = ref.id;
      let goalSnap = await db.collection("goals").doc(revision.goalId).get();
      if (goalSnap.exists) {
        goal = goalSnap.data();
        goal.id = revision.goalId;
      }
    }
    mounted = true;
  });
</script>

{#if firebase && ref && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <EditRevision bind:revisionRef={ref} bind:battleCol bind:firebase />
{/if}
