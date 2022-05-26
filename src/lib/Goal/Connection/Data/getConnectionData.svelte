<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";

  ;

  export let connection;
  export let mounted = false;
  export let connectionId = $page.params.connectionId;

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

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
