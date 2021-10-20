<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  let firebase;
  let curriculumReset = false;
  let mounted = false;
  let db;
  let deleted = false;

  async function removeCurriculumFeatures() {
    deleted = true;
    if (!$session.player.curriculumProfileId) {
      curriculumReset = true;
      return;
    }
    let curriculumProfileRef = db
      .collection("curriculumProfile")
      .doc($session.player.curriculumProfileId);
    try {
      console.log("trying to delete token");
      await curriculumProfileRef.delete();
      let q = db
        .collection("revisions")
        .where("authorId", "==", $session.player.curriculumProfileId);
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
        let playerRef = db.collection("players").doc($session.user.uid);
        let playerSnap = await playerRef.get();
        if (playerSnap.exists) {
          let player = playerSnap.data();
          delete player.curriculumProfileId;
          playerRef.set(player);
        }
      });
      curriculumReset = true;
    } catch (error) {
      console.log("here?");
      console.error(error);
    }
  }

  // $: {
  //   if (
  //     mounted &&
  //     ($session.environment === "cypress" ||
  //       $session.environment === "development") &&
  //     $session.user &&
  //     !deleted
  //   ) {

  //   }
  // }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    if (
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      $session.player &&
      !deleted
    ) {
      await removeCurriculumFeatures();
    }
    mounted = true;
  });
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Now deleting the curriculum profile + revisions!
  {#if curriculumReset}
    <div>Curriculum features are deleted!</div>
  {/if}
{/if}
