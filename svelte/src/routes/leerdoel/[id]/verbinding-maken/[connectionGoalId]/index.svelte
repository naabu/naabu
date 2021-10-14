<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import CreateConnection from "$lib/Goal/Connection/create.svelte";
  import { getStores, page } from "$app/stores"
  export let goal;
  export let firebase;
  export let mounted;
  export let connectionGoal;


  $: if (firebase) {
    retrieveFirestoreData()
  }

  async function retrieveFirestoreData() {
		let db = await firebase.firestore();
		let ref = db.collection('goals').doc($page.params.connectionGoalId);
    let snap = await ref.get();
    if (snap.exists) {
      connectionGoal = snap.data();
      connectionGoal.id = ref.id;
    }
	}
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted && goal && connectionGoal}
  <CreateConnection bind:goal bind:connectionGoal bind:firebase />
{/if}