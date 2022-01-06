<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        ($session.environment === "cypress" ||
        $session.environment === "test"||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous
      ) {
        firebase.auth().signOut();
      }
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "test" || $session.environment === "development"}
  Logging out current user <br />
  {#if $session.user && $session.user.isAnonymous}
  <div data-test="complete">Logout complete</div> 
  {/if}
{/if}
