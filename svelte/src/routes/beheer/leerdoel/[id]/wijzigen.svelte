<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc, collection } from "firebase/firestore";
	import EditGoal from '$lib/Goal/edit.svelte';
	import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"

	let ref;
  let battleCol;

	onMount(async() => {
		//TODO try to get firestore to work with SSR.
		//https://www.google.com/search?q=ssr+firestore+auth
		let db = await getFirebaseFirestore($session.environment);
		ref = doc(db, 'goals', $page.params.id);
    battleCol = collection(db, 'goals/' + $page.params.id + "/battles")
	});


</script>

{#if ref}
	<EditGoal bind:goalRef={ref} bind:battleCol/>
{/if}