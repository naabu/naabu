<script>
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { retrieveActivityListFB } from "$lib/Activity/Components/helper";

 
  export let activities;
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
      activities = await retrieveActivityListFB(db, $session.user.uid);
    }
  }
</script>
