<script>
  import { getStores, session } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { onMount } from "svelte";
  let firebase;


  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });

  async function login() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  }
</script>

{#if $session.user}
  <slot/>
{:else}
  <p>Je moet eerst inloggen om naar de lerarenkamer te gaan</p>
  <a
    href="#"
    on:click|preventDefault={login}
    class="inline-block mt-4 bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
    >Inloggen</a
  >
{/if}
