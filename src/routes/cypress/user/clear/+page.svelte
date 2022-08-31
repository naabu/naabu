<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";

  $: (async () => {
    if ($firebase) {
     
      if (
        ($page.data.session.environment === "cypress" ||
        $page.data.session.environment === "test"||
          $page.data.session.environment === "development") &&
        $user &&
        !$user.isAnonymous
      ) {
        await $firebase.auth().currentUser.delete();
      }
    }
  })();
</script>

{#if $page.data.session.environment === "cypress" || $page.data.session.environment === "test" || $page.data.session.environment === "development"}
  Great success! Now logout!
  {#if $user && $user.isAnonymous}
    <div data-test="complete">Deleting user complete</div>
  {/if}
{/if}
