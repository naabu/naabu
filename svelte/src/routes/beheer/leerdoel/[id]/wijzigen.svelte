<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc } from "firebase/firestore";
	import EditGoal from '$lib/Goal/edit.svelte';
	import { onMount } from 'svelte';
	import { session, page } from "$app/stores";

	let ref;

	onMount(async() => {
		//TODO try to get firestore to work with SSR.
		//https://www.google.com/search?q=ssr+firestore+auth
		let db = await getFirebaseFirestore($session.environment);
		ref = doc(db, 'goals', $page.params.id);
	});


</script>

{#if ref}
	<EditGoal bind:goalRef={ref}/>
{/if}