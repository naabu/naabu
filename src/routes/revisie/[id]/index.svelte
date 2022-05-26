<script>
  import Show from "$lib/Internals/Revision/show.svelte";
  import { getStores, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getNextAndPreviousRevisions } from "$lib/Internals/Revision/helper";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import { t } from "svelte-intl-precompile";

  ;
  let db;
  let revision = null;
  let mounted = false;
  let previousPreviousRevision = null;
  let previousRevision = null;
  let nextRevision = null;
  let loading = false;
  let goal;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.url.pathname,
        value: $t("show-revision"),
      },
    ];
  }

  const update = async () => {
    loading = true;
    previousRevision = null;
    nextRevision = null;
    await retrieveFirestoreData();
    loading = false;
  };

  $: if ($page.params.id && mounted) {
    update();
  }

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
      db = await firebase.firestore();
      mounted = true;
      await retrieveFirestoreData();
    }
  })();

  async function retrieveFirestoreData() {
    let ref = db.collection("revisions").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      revision = snap.data();
      revision.revisionId = ref.id;
      let goalSnap = await db.collection("goals").doc(revision.goalId).get();
      if (goalSnap.exists) {
        goal = goalSnap.data();
        goal.id = revision.goalId;
        let returnRevisions = getNextAndPreviousRevisions(
          goal.revisionList,
          revision.revisionId
        );
        nextRevision = returnRevisions.nextRevision;
        if (nextRevision !== null) {
          nextRevision.revisionId = nextRevision.id;
        }
        previousRevision = returnRevisions.previousRevision;
        if (previousRevision !== null) {
          previousRevision.revisionId = previousRevision.id;
        }

        previousPreviousRevision = returnRevisions.previousPreviousRevision;
        if (previousPreviousRevision !== null) {
          previousPreviousRevision.revisionId = previousPreviousRevision.id;
        }
      }
    }
  }
</script>

{#if mounted && revision !== null && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />

  <Show
    bind:revision
    bind:previousPreviousRevision
    bind:previousRevision
    bind:nextRevision
    bind:loading
  />
{/if}
