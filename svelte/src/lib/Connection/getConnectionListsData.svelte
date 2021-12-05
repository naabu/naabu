<script>
  import { onMount } from "svelte";
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import { queryConnections } from "$lib/Connection/helper";

  export let firebase;
  export let connections;
  export let mounted = false;
  export let type;
  export let status;
  export let goalId;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    connections = await queryConnections(db, type, status, goalId);
  }
</script>
