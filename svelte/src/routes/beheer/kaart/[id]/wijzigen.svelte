<script>
	import Edit from '$lib/Map/edit.svelte';
	import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;
	let ref;


	onMount(async() => {
    firebase = await initFirebase($session.environment);
		const db = await firebase.firestore();
		ref = db.collection('maps').doc($page.params.id);
	});


</script>

{#if firebase && ref}
	<Edit bind:ref/>
{/if}
