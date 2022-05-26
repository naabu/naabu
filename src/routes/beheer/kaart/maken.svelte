<script>
	import CreateMap from '$lib/Module/Map/Components/create.svelte';
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getStores, session} from "$app/stores"
  import { onMount } from 'svelte';
  
 

  $: (async () => {
    if ($firebase) {
     
    }
  })();
</script>

{#if $firebase}
  <CreateMap />
{/if}
