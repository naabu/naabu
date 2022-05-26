<script>
	import Dashboard from '$lib/Activity/Components/dashboard.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";

 

	let activity;
  let feedback = [];
  let mounted = false;
  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: $t("management")
    },
    {
      url: '/beheer/activiteit',
      value: $t("activity")
    },
    {
      url: "/beheer/activiteit/" + $page.params.id + "/dashboard",
      value: $t("activity-dashboard")
    },
  ];

  
  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
    
    await retrieveFirestoreData();
    mounted = true;

    }
  })();

  async function retrieveFirestoreData() {
		let db = await $firebase.firestore();
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
