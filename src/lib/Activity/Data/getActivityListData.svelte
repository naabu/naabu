<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { retrieveActivityListFB } from "$lib/Activity/Components/helper";

 
  export let activities;
  export let mounted = false;
  export let status;

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    if ($session.user) {
      activities = await retrieveActivityListFB(db, status, $session.user.uid);
    }
  }
</script>
