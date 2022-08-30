<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
 

  $: (async () => {
    if ($firebase) {
     
      if (
        ($page.data.session.environment === "cypress" ||
        $page.data.session.environment === "test"||
          $page.data.session.environment === "development") &&
        $user &&
        !$user.isAnonymous
      ) {
       $firebase.auth().signOut();
      }
    }
  })();
</script>

{#if $page.data.session.environment === "cypress" || $page.data.session.environment === "test" || $page.data.session.environment === "development"}
  Logging out current user <br />
  {#if $user && $user.isAnonymous}
  <div data-test="complete">Logout complete</div> 
  {/if}
{/if}
