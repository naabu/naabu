<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
 

  $: (async () => {
    if ($firebase) {
      {console.log("firebase is working")}
      if (
        ($session.environment === "cypress" ||
          $session.environment === "development" ||
          $session.environment === "test") &&
        $session.user &&
        $session.user.isAnonymous
      ) {
        let email = $page.params.email;
        let password = $page.params.password;
        try {
          let result = await $firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        } catch (error) {
         $firebase.auth().signInWithEmailAndPassword(email, password);
        }
      }
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "development" || $session.environment === "test"}
  Great success! Now login!
  {#if $session.user && !$session.user.isAnonymous}
    <div data-test="complete">Login complete</div>
  {/if}
{/if}
