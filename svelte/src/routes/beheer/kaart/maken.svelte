<script>
	import CreateMap from '$lib/Map/create.svelte';
  import { firebaseStore } from "$lib/Firebase/store";
  import { getStores, session} from "$app/stores"
  import { onMount } from 'svelte';
  
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

{#if firebase}
  <CreateMap bind:firebase/>
{/if}