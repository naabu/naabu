<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  let oldUser = null;
 
  let auth;
  let resetFeedback = false;
  let resetUserGoalScore = false;

  $: if ($session.user && $session.user.uid && oldUser == null && auth) {
    oldUser = $session.user;
    let email = $page.params.email;
    let password = $page.params.password;
    auth.signInWithEmailAndPassword(email, password);
  }

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
      auth = await$firebase.auth();
    }
  })();
</script>

{#if oldUser && $session.user && oldUser.uid != $session.user.uid}
  <ClearHelper
    collection="feedback"
    fieldUserId="uid"
    uid={oldUser.uid}
    bind:resetDone={resetFeedback}
    showComplete={false}
  />

  <ClearHelper
    collection="userGoalScore"
    fieldUserId="uid"
    uid={oldUser.uid}
    bind:resetDone={resetUserGoalScore}
    showComplete={false}
  />
{/if}

{#if resetFeedback && resetUserGoalScore}
  <div data-test="complete">The Feedback and UserGoalScores are cleared</div>
{/if}
