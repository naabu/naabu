<script>
	import CreateMap from '$lib/Map/create.svelte';
  import { initFirebase } from "$lib/firebase";
  import { getStores, session} from "$app/stores"
  import { onMount } from 'svelte';
  
  let firebase;

  onMount(async() => {
    firebase = await initFirebase($session.environment);
  });
</script>

{#if firebase}
  <CreateMap bind:firebase/>
{/if}