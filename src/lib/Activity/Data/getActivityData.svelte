<script>
  import { firebase } from "$lib/Internals/Firebase/store";
  import { loadPluginData } from "$lib/Activity/Components/helper";
  import { getStores, page } from "$app/stores";
  export let activity;
  export let cloneActivity;
  export let mounted = false;
  export let activityId = $page.params.activityId;
  export let loadComponent = "render";
  
  $: (async () => {
    if ($firebase && !mounted) {
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("activities").doc(activityId);
    let snap = await ref.get();
    let object = await loadPluginData(activityId, snap, loadComponent);
    cloneActivity =  await loadPluginData(activityId, snap, loadComponent);;
    activity = object;
  }
</script>
