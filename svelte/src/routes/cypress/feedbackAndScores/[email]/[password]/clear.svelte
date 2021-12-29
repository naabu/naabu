<script>
  import ClearHelper from "$lib/Cypress/clearFirestore.svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  let oldUser = null;
  let firebase;
  let auth;
  let resetFeedback = false;
  let resetUserGoalScore = false;

  $: if (oldUser) {
    console.log(oldUser.uid);
  }

  $: if ($session.user) {
    console.log($session.user.uid);
  }

  $: if ($session.user && $session.user.uid && oldUser == null && auth) {
    oldUser = $session.user;
    let email = $page.params.email;
    let password = $page.params.password;
    auth.signInWithEmailAndPassword(email, password);
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      auth = await firebase.auth();
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
