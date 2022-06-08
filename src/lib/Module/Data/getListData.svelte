<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { retrieveMapsListFB } from "$lib/Module/Components/helper";

 
  export let modules;
  export let mounted = false;

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    if ($session.user) {
      modules = await retrieveMapsListFB(db, $session.user.uid);
    }
  }
</script>
