<script>
  import EditRevision from "$lib/Internals/Revision/edit.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import { t } from "svelte-intl-precompile";

 
  let ref;
  let battleCol;
  let goal;
  let mounted = false;

  let breadcrumbs;

  function setBreadcrumbs() {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.url.pathname,
        value: $t("edit-goal-from-revision"),
      },
    ];
  }

  $: (async () => {
    if ($firebase && !mounted) {
      mounted = true;
     
      let db = await $firebase.firestore();
      ref = db.collection("revisions").doc($page.params.id);
      battleCol = db.collection("revisions/" + $page.params.id + "/battles");
      let snap = await ref.get();
      if (snap.exists) {
        let revision = snap.data();
        revision.revisionId = ref.id;
        let goalSnap = await db.collection("goals").doc(revision.goalId).get();
        if (goalSnap.exists) {
          goal = goalSnap.data();
          goal.id = revision.goalId;
        }
      }
    }
  })();
</script>

{#if $firebase && ref && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <EditRevision bind:revisionRef={ref} bind:battleCol  />
{/if}
