<script>
  export let revisions = [];
  import { onMount } from "svelte";
  import { getStores, session } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { queryRevisions } from "$lib/Revision/helper";

  export let firebase;
  export let mounted = false;
  export let revisionType;
  export let sourceId;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    revisions = await queryRevisions(db, revisionType, sourceId);
  }
</script>
