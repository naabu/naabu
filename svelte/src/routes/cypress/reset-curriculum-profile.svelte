<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;
  let curriculumReset = false;
  let mounted = false;
  let db;

  async function removeCurriculumFeatures() {
    if (!$session.player || !$session.player.curriculumProfileId) {
      curriculumReset = true;
      return;
    }

    let curriculumProfileRef = db
      .collection("curriculumProfile")
      .doc($session.player.curriculumProfileId);
    try {
      let curriculumProfileSnap = await curriculumProfileRef.get();
      if (!curriculumProfileSnap.exists) {
        curriculumReset = true;
        return;
      }

      let q = db
        .collection("revisions")
        .where("authorId", "==", $session.user.uid);
      const querySnapshot = await q.get();
      console.log("Found revisions for user");
      let goalsSnapToDelete = [];
      querySnapshot.forEach((snap) => {
        goalsSnapToDelete.push(snap);
      });
      for (let i = 0; i < goalsSnapToDelete.length; i++) {
        let snap = goalsSnapToDelete[i];
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
        console.log("deleted goal");	
        await snap.ref.delete();
        console.log("deleted revision");	
      }

      await curriculumProfileRef.delete();
      console.log("deleted curriculum profile");
      let playerRef = db.collection("players").doc($session.user.uid);
      let playerSnap = await playerRef.get();
      if (playerSnap.exists) {
        let player = playerSnap.data();
        delete player.curriculumProfileId;
        await playerRef.set(player);
      }
      curriculumReset = true;
    } catch (error) {
      console.error(error);
    }
  }

  $: (async () => {
    if (
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      db &&
      $session.user &&
      $session.player
    ) {
      await removeCurriculumFeatures();
    }
  })();

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      db = await firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Now deleting the curriculum profile + revisions!
  {#if curriculumReset}
    <div>Curriculum features are deleted!</div>
  {/if}
{/if}
