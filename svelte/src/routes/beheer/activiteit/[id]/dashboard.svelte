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
	// import {doc, getDoc, collection, query, where, getDocs, orderBy, limit} from "firebase/firestore";
	import Dashboard from '$lib/Activity/dashboard.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { firebaseStore } from "$lib/Internals/Firebase/store";

  let firebase;

	let activity;
  let feedback = [];
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
      url: "/beheer/activiteit/" + $page.params.id + "/dashboard",
      value: 'Activiteit dashboard'
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
    let feedbackCollection = db.collection('feedback');
    // Order by time
    // Only show last 100.
    const q = feedbackCollection.where("activityId", "==", $page.params.id).orderBy("time").limit(100);
    const querySnapshot = await q.get();
    querySnapshot.forEach((doc) => {
      let feedbackData = doc.data();
      feedbackData.id = doc.id;
      let d = new Date(feedbackData.time);
      feedbackData.dateString = d.toLocaleDateString() + " " + d.toLocaleTimeString();

      feedback = [...feedback, feedbackData];
    });
	}
</script>

{#if mounted}
  <Dashboard bind:activity bind:feedback bind:breadcrumbs/> 
{/if}