<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  export let firebase;
  export let module;
  export let mounted = false;
  export let moduleId = $page.params.moduleId;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("modules").doc(moduleId);
    let snap = await ref.get();
    if (snap.exists) {
      module = snap.data();
      module.id = ref.id;
      for (let i = 0; i < module.paths.length; i++) {
        let addPath = module.paths[i];
        addPath.points = JSON.parse(addPath.points);
      }
    }
  }
</script>
