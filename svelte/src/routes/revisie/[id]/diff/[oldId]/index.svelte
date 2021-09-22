<script>
	import Diff from '$lib/Revision/diff.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;

	let revisionNew;
  let revisionOld;
  
  let mounted = false;

  onMount(async() => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
		let db = await firebase.firestore();
		let newRef = db.collection('revisions').doc($page.params.id);
    let newSnap = await newRef.get();
    if (newSnap.exists) {
      revisionNew = newSnap.data();
      revisionNew.id = newRef.id;
    }
    let oldRef = db.collection('revisions').doc($page.params.oldId);
    let oldSnap = await oldRef.get();
    if (oldSnap.exists) {
      revisionOld = oldSnap.data();
      revisionOld.id = oldRef.id;
    }
	}
</script>

{#if mounted}
  <Diff bind:revisionNew bind:revisionOld/> 
{/if}