<script>
  export let revisions = [];
  import { onMount } from "svelte";
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { queryRevisions } from "$lib/Revision/helper";

  export let firebase;
  export let mounted = false;
  export let revisionType;
  export let sourceId;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    revisions = await queryRevisions(db, revisionType, sourceId);
  }
</script>
