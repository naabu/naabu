<script>
  import ShowAdventure from '$lib/Goal/Adventure/show.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;
	let goal;
  let adventureRef;
  let adventure;
  let mounted = false;
  let activity;

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

		adventureRef = db.collection('goals').doc($page.params.id).collection('adventures').doc($page.params.adventureId);
    let adventureSnap = await adventureRef.get();
    if (adventureSnap.exists) {
      adventure = adventureSnap.data();
      adventure.id = adventureRef.id;
      let activityId = adventure.activityId;
      let activityRef = db.collection('activities').doc(activityId);
      let activitySnap = await activityRef.get();
      if (activitySnap.exists) {
        activity = activitySnap.data();
        activity.id = activityId;
      }
    }
	}
</script>

{#if mounted && goal && activity && adventure}
  <ShowAdventure bind:firebase bind:goal bind:adventure bind:activity/>
{/if}