<script>
  import AdventureCreateForm from '$lib/Goal/Adventure/create.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;

	let goal;
  let activity;
  let mounted = false;

  onMount(async() => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
		let db = await firebase.firestore();
		let ref = db.collection('goals').doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      goal = snap.data();
      goal.id = ref.id;
    }

		let activityRef = db.collection('activities').doc($page.params.activityId);
    let activitySnap = await activityRef.get();
    if (activitySnap.exists) {
      activity = activitySnap.data();
      activity.id = activityRef.id;
    }

	}
</script>

{#if mounted}
  <AdventureCreateForm bind:firebase bind:goal bind:activity/>
{/if}