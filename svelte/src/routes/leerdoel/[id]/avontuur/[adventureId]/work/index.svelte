<script>
  import WorkOnAdventure from '$lib/Goal/Adventure/work.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;
	let goal;
  let adventureRef;
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

		adventureRef = db.collection('goals').doc($page.params.id).collection('adventures').doc($page.params.adventureId);

	}
</script>

{#if mounted && goal && adventureRef}
  <WorkOnAdventure bind:firebase bind:goal bind:adventureRef/>
{/if}