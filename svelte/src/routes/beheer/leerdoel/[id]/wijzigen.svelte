<!-- <script context="module" >
  import { initFirebase } from "$lib/firebase";

  export async function load({session}) {
    let firebase = await initFirebase(session.environment);
    return {
      props: {
        firebase: firebase
      },
    };
  }
</script> -->

<script>
 // import firebase from "firebase/app";
	// import { getFirebaseFirestore } from "$lib/firebase.js";	
	// import {doc, collection } from "firebase/firestore";
	import EditGoal from '$lib/Goal/edit.svelte';
	import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;



	let ref;
  let battleCol;

	onMount(async() => {
		//TODO try to get firestore to work with SSR.
		//https://www.google.com/search?q=ssr+firestore+auth
    firebase = await initFirebase($session.environment);
		let db = await firebase.firestore();
		ref = db.collection('goals').doc($page.params.id);
    battleCol = db.collection('goals/' + $page.params.id + "/battles")
	});


</script>

{#if firebase && ref}
	<EditGoal bind:goalRef={ref} bind:battleCol bind:firebase/>
{/if}