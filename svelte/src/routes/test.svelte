<!-- <script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import Firebase from "$lib/Firebase/loadFirebase.svelte";

  export let firebase;

  onMount(async () => {
    await retrieveFirestoreData();
  });

  async function retrieveFirestoreData() {
    console.log('test');
    let db = await firebase.firestore();
  }
</script>

<Firebase /> -->
