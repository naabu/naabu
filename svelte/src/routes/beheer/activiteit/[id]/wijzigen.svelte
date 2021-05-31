<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc} from "firebase/firestore";
	import Edit from '$lib/Activity/edit.svelte';
	import { onMount } from 'svelte';
	import { session, page } from "$app/stores";

	let ref;

	onMount(async() => {
		//TODO try to get firestore to work with SSR.
		//https://www.google.com/search?q=ssr+firestore+auth
		let db = await getFirebaseFirestore($session.environment);
		ref = doc(db, 'activities', $page.params.id);
	});


</script>

{#if ref}
	<Edit bind:ref/>
{/if}
