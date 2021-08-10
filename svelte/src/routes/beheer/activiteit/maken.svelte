<!-- <script context="module" >
  import { initFirebase } from "$lib/firebase";

  export async function load({session}) {
    let firebase = await initFirebase(session.environment);
    return {
      props: {
        firebase: firebase
      },
    };
  }
</script> -->

<script>
	import CreateActivity from '$lib/Activity/create.svelte';
  import { onMount } from 'svelte';
  import { initFirebase } from "$lib/firebase";
  import { getStores, session} from "$app/stores"
  let firebase;

  onMount(async() => {
    firebase = await initFirebase($session.environment);
	});
</script>

{#if firebase}
  <CreateActivity bind:firebase/>
{/if}