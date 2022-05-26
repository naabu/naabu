<script>
  import { firebase } from "$lib/Internals/Firebase/store";
  import { loadPluginDataFromFirestore } from "../Plugin/loader";
  export let dashboardItems;
  export let mounted = false;
  export let svelteComponent = "render";

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("dashboardItems");
    const querySnapshot = await ref.get();
    querySnapshot.forEach((doc) => {
      let dashboardItem = doc.data();
      dashboardItem.id = doc.id;
      dashboardItem.modelProcessed = false;
      dashboardItems = [...dashboardItems, dashboardItem];
    });
    for (let i = 0; i < dashboardItems.length; i++) {
      let dashboardItem = dashboardItems[i];
      dashboardItem.modelPlugins = await loadPluginDataFromFirestore(
        dashboardItem.modelPlugins,
        svelteComponent
      );
      dashboardItem.feedbackPlugins = await loadPluginDataFromFirestore(
        dashboardItem.feedbackPlugins,
        svelteComponent
      );
    }
  }
</script>
