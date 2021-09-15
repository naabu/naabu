<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  let firebase;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    if ($session.environment === "cypress") {
      let email = "cypress@example.com";
      let password = "cypress";

      firebase.auth().signInWithEmailAndPassword(email, password);
    }
  });
</script>

{#if $session.environment === "cypress"}
  Great success! Now login!
  {#if $session.user}
    Login complete
  {/if}
{/if}
