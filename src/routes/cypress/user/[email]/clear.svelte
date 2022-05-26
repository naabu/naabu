<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  ;

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
      if (
        ($session.environment === "cypress" ||
        $session.environment === "test"||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous
      ) {
        let email = $page.params.email;
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

{#if $session.environment === "cypress" || $session.environment === "test" || $session.environment === "development"}
  Great success! Now logout!
  {#if $session.user && $session.user.isAnonymous}
    <div data-test="complete">Deleting user complete</div>
  {/if}
{/if}
