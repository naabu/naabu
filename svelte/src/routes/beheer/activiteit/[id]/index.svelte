
<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc, getDoc} from "firebase/firestore";
	import Show from '$lib/Activity/show.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"

	let activity;
  let mounted = false;


	onMount(async() => {
    // TODO: Look into making this work on Server Side Rendering
    // Should not be on an onMount?
    // Maybe use firebase admin?
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
		//TODO try to get firestore to work with SSR.
		//https://www.google.com/search?q=ssr+firestore+auth
		let db = await getFirebaseFirestore($session.environment);
		let ref = doc(db, 'activities', $page.params.id);
    let snap = await getDoc(ref);
    if (snap.exists()) {
      activity = snap.data();
    }
    mounted = true;
	}

</script>

{#if mounted}
  <Show bind:activity/> 
{/if}