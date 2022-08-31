<script>
  import { onMount } from "svelte";
  
  import { firebase } from "$lib/Internals/Firebase/store";
  import { queryConnections } from "$lib/Goal/Connection/Components/helper";

 
  export let connections;
  export let mounted = false;
  export let type;
  export let goalId;

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    connections = await queryConnections(db, type, goalId);
  }
</script>
