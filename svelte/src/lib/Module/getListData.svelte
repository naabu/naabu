<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import { retrieveMapsListFB } from "$lib/Module/helper";

  export let firebase;
  export let modules;
  export let mounted = false;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    if ($session.user) {
      modules = await retrieveMapsListFB(db, $session.user.uid);
    }
  }
</script>
