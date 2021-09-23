<script>
	import CurriculumProfile from '$lib/Curriculum/profile.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;

	let curriculumProfile;
  let mounted = false;

  onMount(async() => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
		let db = await firebase.firestore();
		let ref = db.collection('curriculumProfile').doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      curriculumProfile = snap.data();
      curriculumProfile.id = ref.id;
    }
	}
</script>

{#if mounted}
  <Show bind:curriculumProfile/> 
{/if}