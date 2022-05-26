<script>
  export let revisions = [];
  import { onMount } from "svelte";
  import { getStores, session } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { queryRevisions } from "$lib/Internals/Revision/helper";

  ;
  export let mounted = false;
  export let revisionType;
  export let sourceId;

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    revisions = await queryRevisions(db, revisionType, sourceId);
  }
</script>
