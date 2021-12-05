<script>
	import CreateActivity from '$lib/Activity/create.svelte';
  import { onMount } from 'svelte';
  import { firebaseStore } from "$lib/Firebase/store";
  import { getStores, session} from "$app/stores"
  let firebase;
 
  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

{#if firebase}
  <CreateActivity bind:firebase/>
{/if}
