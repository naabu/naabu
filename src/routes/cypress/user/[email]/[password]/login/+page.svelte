<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
 

  $: (async () => {
    if ($firebase) {
      {console.log("firebase is working")}
      if (
        ($page.data.session.environment === "cypress" ||
          $page.data.session.environment === "development" ||
          $page.data.session.environment === "test") &&
        $user &&
        $user.isAnonymous
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

{#if $page.data.session.environment === "cypress" || $page.data.session.environment === "development" || $page.data.session.environment === "test"}
  Great success! Now login!
  {#if $user && !$user.isAnonymous}
    <div data-test="complete">Login complete</div>
  {/if}
{/if}
