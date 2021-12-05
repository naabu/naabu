<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        $session.environment === "cypress" ||
        $session.environment === "development"
      ) {
        let email = "cypress@example.com";
        let password = "cypress";

        firebase.auth().signInWithEmailAndPassword(email, password);
      }
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Great success! Now login!
  {#if $session.user}
    Login complete
  {/if}
{/if}
