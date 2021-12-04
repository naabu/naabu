<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { retrieveMapsListFB } from "./helper";

  export let firebase;
  export let modules;
  export let mounted = false;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    if ($session.user) {
      modules = await retrieveMapsListFB(db, $session.user.uid);
    }
  }
</script>
