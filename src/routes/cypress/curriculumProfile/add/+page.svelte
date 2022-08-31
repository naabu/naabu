<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import sanitizeHtml from 'sanitize-html';
  import { user, player } from "$lib/Internals/User/store";
  
  let mounted = false;
  let db;
  let feedbackstring = "<br> feedback: <br>";
  let ready = false;

  async function setupCurriculumProfile() {
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
      !$user.isAnonymous &&
      !ready
    ) {
      await setupCurriculumProfile();
      ready = true;
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
  Now setting up the curriculumProfile
  {@html sanitizeHtml
(feedbackstring)}

  {#if ready}
    <div data-test="complete">CurriciulumProfile ready for testing</div>
  {/if}
{/if}
