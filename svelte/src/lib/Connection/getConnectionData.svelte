<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";

  export let firebase;

  export let connection;
  export let mounted = false;
  export let connectionId = $page.params.connectionId;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("connections").doc(connectionId);
    let snap = await ref.get();
    if (snap.exists) {
      connection = snap.data();
      connection.id = ref.id;
    }
  }
</script>
