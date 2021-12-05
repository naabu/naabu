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
	// import { getFirebaseFirestore } from "$lib/firebase.js";	
	// import {doc, getDoc} from "firebase/firestore";
 // import firebase from "firebase/app";
	import Show from '$lib/Activity/show.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { firebaseStore } from "$lib/Firebase/store";

  let firebase;

	let activity;
  let mounted = false;
  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    },
    {
      url: '/beheer/activiteit',
      value: 'Activiteit'
    },
    {
      url: "/beheer/activiteit/" + $page.params.id,
      value: 'Activiteit bekijken'
    },
  ];

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
    mounted = true;

    }
  })();

  async function retrieveFirestoreData() {
		let db = await firebase.firestore();
		let ref = db.collection('activities').doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      activity = snap.data();
      activity.id = ref.id;
    }
	}
</script>

{#if mounted}
  <Show bind:activity bind:breadcrumbs bind:firebase/> 
{/if}