<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  let firebase;
  let resetDone = false;
  let mounted = false;
  let db;

  async function setupLearningGoals() {
    if (!$session.player.curriculumProfileId) {
      let profileData = {
        fullname: "Cypress test user",
      };
      let profileRef = db.collection("curriculumProfile");
      let result = await profileRef.add(profileData);
      $session.player.curriculumProfileId = result.id;
      let playerRef = db.collection("players").doc($session.user.uid);
      await playerRef.update({ curriculumProfileId: result.id });
    }

    let goalRef1 = db.collection("goals").doc("cypress-test-goal-1");
    let goalRef2 = db.collection("goals").doc("cypress-test-goal-2");
    try {
      let goalSnap1 = await goalRef1.get();
      let goalSnap2 = await goalRef2.get();

      if (goalSnap1.exists) {
        await goalRef1.delete();
      }

      if (goalSnap2.exists) {
        await goalRef2.delete();
      }

      let goalData1 = {
        title: "Cypress Test Goal 1",
        description: "This is a test goal for Cypress",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await goalRef1.set(goalData1);

      let goalData2 = {
        title: "Cypress Test Goal 2",
        description: "This is a test goal for Cypress",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await goalRef2.set(goalData2);
      resetDone = true;
    } catch (error) {
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

  $: (async () => {
    if (
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      db &&
      $session.player
    ) {
      await setupLearningGoals();
    }
  })();

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    mounted = true;
  });
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Now setting up the learning goals
  {#if resetDone}
    <div>learning goal ready for testing</div>
  {/if}
{/if}
