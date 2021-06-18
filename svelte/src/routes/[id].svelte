
<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc, getDoc} from "firebase/firestore";
	import Show from '$lib/Activity/show.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"

	let activity;
  let mounted = false;
  let breadcrumbs = [ 
    {
      url: '/',
      value: 'Reis'
    },
    {
      url: "/" + $page.params.id,
      value: 'Activiteit bekijken'
    },
  ];

  onMount(async() => {
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
		let db = await getFirebaseFirestore($session.environment);
		let ref = doc(db, 'activities', $page.params.id);
    let snap = await getDoc(ref);
    if (snap.exists()) {
      activity = snap.data();
      activity.id = ref.id;
    }
	}
</script>

{#if mounted && activity}
  <Show bind:activity bind:breadcrumbs/> 
{/if}