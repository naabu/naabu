<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
 import DOMPurify from 'dompurify';
  import { user, player } from "$lib/Internals/User/store";
 
  let resetDone = false;
  let mounted = false;
  let db;
  let feedbackstring = "<br> feedback: <br>";

  async function setupLearningGoals() {
    if (!$player.curriculumProfileId) {
      feedbackstring += "creating a profile <br>";
      let profileData = {
        fullname: "Cypress test user",
        uid: $user.uid,
      };
      let profileRef = db.collection("curriculumProfile");
      let result = await profileRef.add(profileData);
      $player.curriculumProfileId = result.id;
      let playerRef = db.collection("players").doc($user.uid);
      await playerRef.update({ curriculumProfileId: result.id });
      feedbackstring += "profile created " + result.id + "<br>";
    }

    let goalRef1 = db.collection("goals").doc("cypress-test-goal-1");
    let goalRef2 = db.collection("goals").doc("cypress-test-goal-2");
    try {
      feedbackstring += "Getting goal snap <br>";
      let goalSnap1 = await goalRef1.get();
      let goalSnap2 = await goalRef2.get();

      if (goalSnap1.exists) {
        feedbackstring += "Goal 1 exists deleting <br>";
        await goalRef1.delete();
        feedbackstring += "Goal 1 deleted <br>";
      }

      if (goalSnap2.exists) {
        feedbackstring += "Goal 2 exists deleting <br>";
        await goalRef2.delete();
        feedbackstring += "Goal 2 deleted <br>";
      }

      let goalData1 = {
        title: "Cypress Test Goal 1",
        description: "This is a test goal for Cypress",
        createdAt:$firebase.firestore.FieldValue.serverTimestamp(),
      };
      feedbackstring += "Set goal 1 <br>";
      await goalRef1.set(goalData1);
      feedbackstring += "Set goal 1 complete <br>";

      let goalData2 = {
        title: "Cypress Test Goal 2",
        description: "This is a test goal for Cypress",
        createdAt:$firebase.firestore.FieldValue.serverTimestamp(),
      };
      feedbackstring += "Set goal 2 <br>";
      await goalRef2.set(goalData2);
      feedbackstring += "Set goal 2 complete <br>";
      resetDone = true;
    } catch (error) {
      console.error(error);
    }
  }

  // $: (async () => {
  //   if (
  //     mounted &&
  //     ($page.data.session.environment === "cypress" ||
  //       $page.data.session.environment === "development") &&
  //     $user &&
  //     !deleted
  //   ) {
  //     deleted = true;
  //     // await removeCurriculumFeatures();
  //   }
  // })();

  $: (async () => {
    if (
      ($page.data.session.environment === "cypress" ||
      $page.data.session.environment === "test" ||
        $page.data.session.environment === "development") &&
      db &&
      $player &&
      $user &&
      !$user.isAnonymous
    ) {
      await setupLearningGoals();
    }
  })();

  $: (async () => {
    if ($firebase) {
     
      db = await $firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $page.data.session.environment === "cypress" || $page.data.session.environment === "test" || $page.data.session.environment === "development"}
  Now setting up the learning goals
  {@html DOMPurify.sanitize(feedbackstring)}

  {#if resetDone}
    <div data-test="complete">learning goal ready for testing</div>
  {/if}
{/if}
