<script>
  import { firebase } from "$lib/Internals/Firebase/store";
  import { retrieveActivityListFB } from "$lib/Activity/Components/helper";
  import { user } from "$lib/Internals/User/store";
 
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
    if ($user) {
      activities = await retrieveActivityListFB(db, $user.uid);
    }
  }
</script>
