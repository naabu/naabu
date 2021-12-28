<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;
  let mounted = false;
  let db;
  let feedbackstring = "<br> feedback: <br>";
  let ready = false;

  async function setupCurriculumProfile() {
    if (!$session.player.curriculumProfileId) {
      feedbackstring += "creating a profile <br>";
      let profileData = {
        fullname: "Cypress test user",
        uid: $session.user.uid,
      };
      let profileRef = db.collection("curriculumProfile");
      let result = await profileRef.add(profileData);
      $session.player.curriculumProfileId = result.id;
      let playerRef = db.collection("players").doc($session.user.uid);
      await playerRef.update({ curriculumProfileId: result.id });
      feedbackstring += "profile created " + result.id + "<br>";
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
      $session.player &&
      $session.user &&
      !$session.user.isAnonymous &&
      !ready
    ) {
      await setupCurriculumProfile();
      ready = true;
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
  Now setting up the curriciulmProfile
  {@html feedbackstring}

  {#if ready}
    <div data-test="complete">CurriciulumProfile ready for testing</div>
  {/if}
{/if}
