<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  let firebase;
  let curriculumReset = false;
  let mounted = false;
  let db;

  async function removeCurriculumFeatures() {
    let curriculumProfileRef = db
      .collection("curriculumProfile")
      .doc($session.player.id);
    try {
      await curriculumProfileRef.delete();
      let q = db
        .collection("revisions")
        .where("authorId", "==", $session.player.id);
      const querySnapshot = await q.get();
      querySnapshot.forEach(async (snap) => {
        let revisionData = snap.data();
        let goalRef = db.collection("goals").doc(revisionData.goalId);
        let goalSnap = goalRef.get();
        if (goalSnap.exists) {
          let goalData = goalSnap.data();
          if (goalData.talkId) {
            db.collection("talk").doc(goalData.talkId).delete();
          }
        }
        await goalRef.delete();
        await snap.ref.delete();
      });
      curriculumReset = true;
    } catch (error) {
      console.error(error);
    }
  }

  $: {
    if (
      mounted &&
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      $session.player
    ) {
      removeCurriculumFeatures();
    }
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    mounted = true;
  });
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Now deleting the curriculum profile + revisions!
  {#if curriculumReset}
    <div>Curriculum features are deleted!</div>
  {/if}
{/if}
