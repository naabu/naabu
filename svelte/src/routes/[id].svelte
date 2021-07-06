
<script>
	import { getFirebaseFirestore } from "$lib/firebase";	
	import {doc, getDoc, collection, query, getDocs} from "firebase/firestore";
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
      // TODO: There can be multiple goals attached to an activity, support this?
      if (activity.goals.length > 0)
      {
        let battleCol = collection(db, 'goals/' + activity.goals[0].objectID + "/battles");
        const q = query(battleCol);
        const querySnapshot = await getDocs(q);
        activity.battles = [];
        querySnapshot.forEach((doc) => {
          let battleObject =  doc.data();
          battleObject.name = doc.id;
          activity.battles = [...activity.battles, battleObject];
        });
      }


    }


	}
</script>

{#if mounted && activity}
  <Show bind:activity bind:breadcrumbs/> 
{/if}