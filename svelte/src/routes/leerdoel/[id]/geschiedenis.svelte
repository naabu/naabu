<script>
	import History from '$lib/Goal/history.svelte';
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";

  let firebase;

	let goal;
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
	}
  let breadcrumbs;
  $: if (goal) {
    breadcrumbs = [
      {
        url: "/curriculum",
        value: "Curriculum",
      },
      {
        url: "/leerdoel/" + goal.id,
        value: "Leerdoel: " + goal.title,
      },
      {
        url:  $page.path,
        value: "Geschiedenis",
      },
    ];
  }
</script>




{#if mounted}
<ContainerBreadcrumpPageTitle bind:breadcrumbs title="{goal.title}" />

  <History bind:goal bind:firebase/> 
{/if}