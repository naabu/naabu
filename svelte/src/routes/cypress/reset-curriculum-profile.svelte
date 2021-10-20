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
    console.log("1");
    if (!$session.player.curriculumProfileId) {
      console.log("2");
      curriculumReset = true;
      return;
    }

    console.log("3");
    let curriculumProfileRef = db
      .collection("curriculumProfile")
      .doc($session.player.curriculumProfileId);
    try {
      console.log("4");
      await curriculumProfileRef.delete();
      console.log("5");
      let q = db
        .collection("revisions")
        .where("authorId", "==", $session.player.curriculumProfileId);
      const querySnapshot = await q.get();
      querySnapshot.forEach(async (snap) => {
        console.log("6");
        let revisionData = snap.data();
        let goalRef = db.collection("goals").doc(revisionData.goalId);
        let goalSnap = goalRef.get();
        if (goalSnap.exists) {
          let goalData = goalSnap.data();
          if (goalData.talkId) {
            console.log("7");
            db.collection("talk").doc(goalData.talkId).delete();
          }
        }
        console.log("8");
        await goalRef.delete();
        console.log("9");
        await snap.ref.delete();
        let playerRef = db.collection("players").doc($session.user.uid);
        let playerSnap = await playerRef.get();
        if (playerSnap.exists) {
          let player = playerSnap.data();
          delete player.curriculumProfileId;
          console.log("10");
          await playerRef.set(player);
        }
      });
      curriculumReset = true;
    } catch (error) {
      console.log("here?");
      console.error(error);
    }
  }

  // $: (async () => {
  //   if (
  //     mounted &&
  //     ($session.environment === "cypress" ||
  //       $session.environment === "development") &&
  //     $session.user &&
  //     !deleted
  //   ) {
  //     deleted = true;
  //     // await removeCurriculumFeatures();
  //   }
  // })();

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    if (
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      $session.user &&
      !deleted
    ) {
      deleted = true;
      await removeCurriculumFeatures();
    }
    else {
      console.log('not set?');
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
