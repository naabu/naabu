<script>
	import CreateActivity from '$lib/Activity/create.svelte';
  import { onMount } from 'svelte';
  import { initFirebase } from "$lib/firebase";
  import { getStores, session, page} from "$app/stores"
    import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getLoungeMenuitems } from "$lib/Teachers/helper";
  let menuitems = getLoungeMenuitems($page.path);
  let firebase;

  onMount(async() => {
    firebase = await initFirebase($session.environment);
	});
</script>


<Sidebar bind:menuitems>
  <span slot="title"> Activiteit maken</span>

  <span slot="content">
      {#if firebase}
      <CreateActivity bind:firebase/>
    {/if}
  </span>
</Sidebar>

