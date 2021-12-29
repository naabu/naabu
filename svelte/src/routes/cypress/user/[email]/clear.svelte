<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        ($session.environment === "cypress" ||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous
      ) {
        let email = $page.params.email;
        console.log(email);
        console.log($session.user.email);
        if ($session.user.email === email) {
          await firebase.auth().currentUser.delete();
        }
        else {
          console.error("trying to delete a wrong user");
          console.error("to fix: log in as the correct user");
        }
      }
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Great success! Now logout!
  {#if $session.user && $session.user.isAnonymous}
    <div data-test="complete">Login complete</div>
  {/if}
{/if}
