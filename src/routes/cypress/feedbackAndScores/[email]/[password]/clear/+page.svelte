<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";
  let oldUser = null;
 
  let auth;
  let resetFeedback = false;
  let resetUserGoalScore = false;

  $: if ($user && $user.uid && oldUser == null && auth) {
    oldUser = $user;
    let email = $page.params.email;
    let password = $page.params.password;
    auth.signInWithEmailAndPassword(email, password);
  }

  $: (async () => {
    if ($firebase) {
      auth = await $firebase.auth();
    }
  })();
</script>

{#if oldUser && $user && oldUser.uid != $user.uid}
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
