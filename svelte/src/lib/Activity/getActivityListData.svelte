<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { retrieveActivityListFB } from "$lib/Activity/helper";

  export let firebase;
  export let activities;
  export let mounted = false;
  export let status;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    if ($session.user) {
      activities = await retrieveActivityListFB(db, status, $session.user.uid);
    }
  }
</script>
