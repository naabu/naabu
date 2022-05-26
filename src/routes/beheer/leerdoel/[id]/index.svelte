<script>
	import Show from '$lib/Goal/Components/show.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { firebase } from "$lib/Internals/Firebase/store";

 

	let goal;
  let mounted = false;

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
    mounted = true;

    }
  })();

  async function retrieveFirestoreData() {
		let db = await $firebase.firestore();
		let ref = db.collection('goal').doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      goal = snap.data();
      goal.id = ref.id;
    }
	}
</script>

{#if mounted}
  <!-- <Show bind:activity bind:breadcrumbs />  -->
{/if}
