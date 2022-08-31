<script>
  import { firebase } from "$lib/Internals/Firebase/store";
  import { retrieveMapsListFB } from "$lib/Module/Components/helper";
  import { user } from "$lib/Internals/User/store";
 
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
    if ($user) {
      modules = await retrieveMapsListFB(db, $user.uid);
    }
  }
</script>
