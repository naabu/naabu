<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getUserModule } from "$lib/Module/Components/helper";
  export let firebase;
  export let module;
  export let mounted = false;
  export let moduleId = $page.params.moduleId;
  export let userModule;
  export let loadUserModule = true;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  $: (async () => {
    if (
      loadUserModule &&
      mounted &&
      module &&
      $session.player &&
      $session.player.id
    ) {
      userModule = await getUserModule(
        firebase,
        module.id,
        module,
        $session.player
      );
      loadUserModule = false;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("modules").doc(moduleId);
    let snap = await ref.get();
    if (snap.exists) {
      module = snap.data();
      module.id = ref.id;
      if (module.paths) {
        for (let i = 0; i < module.paths.length; i++) {
          let addPath = module.paths[i];
          addPath.points = JSON.parse(addPath.points);
        }
      }
    }
  }
</script>
