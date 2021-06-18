
<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc, getDoc, collection, query, where, getDocs, orderBy, limit} from "firebase/firestore";
	import Dashboard from '$lib/Activity/dashboard.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"

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
    console.log(activity);
    let feedbackCollection = collection(db, 'feedback');
    // Order by time
    // Only show last 100.
    const q = query(feedbackCollection, where("activityId", "==", $page.params.id), orderBy("time"), limit(100));
    const querySnapshot = await getDocs(q);
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