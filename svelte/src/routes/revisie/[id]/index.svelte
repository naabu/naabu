<script>
  import Show from "$lib/Revision/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";

  let firebase;
  let db;
  let revision = null;
  let mounted = false;
  let previousPreviousRevision = null;
  let previousRevision = null;
  let nextRevision = null;

  $: if ($page.params.id && mounted) {
    previousRevision = null;
    nextRevision = null;
    retrieveFirestoreData();
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    mounted = true;
    await retrieveFirestoreData();
  });

  function compare(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  }

  async function retrieveFirestoreData() {
    let ref = db.collection("revisions").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      revision = snap.data();
      revision.id = ref.id;
      let goalSnap = await db.collection("goals").doc(revision.goalId).get();
      if (goalSnap.exists) {
        let goalData = goalSnap.data();
        let revisionList = goalData.revisionList;
        revisionList.sort(compare);
        for (let i = 0; i < revisionList.length; i++) {
          if (revisionList[i].id === revision.id) {
            if (i > 0) {
              nextRevision = revisionList[i - 1];
            }
            if (i < revisionList.length - 1) {
              previousRevision = revisionList[i + 1];
            }
            if (i < revisionList.length - 2) {
              previousPreviousRevision = revisionList[i + 2];
            }
          }
        }
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
  />
{/if}
