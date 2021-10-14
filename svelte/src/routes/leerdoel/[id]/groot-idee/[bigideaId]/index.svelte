<script>
  import WorkOnConnection from '$lib/Goal/Connection/work.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;
	let goal;
  let connectionRef;
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

		connectionRef = db.collection('goals').doc($page.params.id).collection('bigideas').doc($page.params.bigideaId);
	}
</script>

{#if mounted && goal && connectionRef}
  <WorkOnConnection bind:firebase bind:goal bind:connectionRef/>
{/if}