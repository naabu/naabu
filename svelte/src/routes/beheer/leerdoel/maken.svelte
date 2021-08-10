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
	import CreateGoal from '$lib/Goal/create.svelte';
  import { onMount } from 'svelte';
  import { initFirebase } from "$lib/firebase";
  import { getStores, session} from "$app/stores"
  let firebase;

  onMount(async() => {
    firebase = await initFirebase($session.environment);
    console.log(firebase);
	});

</script>

{#if firebase}
  <CreateGoal bind:firebase />
{/if}