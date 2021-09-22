<script>
  import Show from "$lib/Revision/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { getNextAndPreviousRevisions } from "$lib/Revision/helper";

  let firebase;
  let db;
  let revision = null;
  let mounted = false;
  let previousPreviousRevision = null;
  let previousRevision = null;
  let nextRevision = null;
  let loading = false;

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

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    mounted = true;
    await retrieveFirestoreData();
  });

  async function retrieveFirestoreData() {
    let ref = db.collection("revisions").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      revision = snap.data();
      revision.id = ref.id;
      let goalSnap = await db.collection("goals").doc(revision.goalId).get();
      if (goalSnap.exists) {
        let goalData = goalSnap.data();
        let returnRevisions = getNextAndPreviousRevisions(
          goalData.revisionList,
          revision.id
        );
        nextRevision = returnRevisions.nextRevision;
        previousRevision = returnRevisions.previousRevision;
        previousPreviousRevision = returnRevisions.previousPreviousRevision;
      }
    }
  }
</script>

{#if mounted && revision !== null}
  <Show
    bind:revision
    bind:previousPreviousRevision
    bind:previousRevision
    bind:nextRevision
    bind:loading
  />
{/if}
