<script>
  import { firebase } from "$lib/Internals/Firebase/store";
  import { loadPluginData } from "$lib/Activity/Components/helper";

  export let activity;
  export let cloneActivity;
  export let mounted = false;
  export let activityId = $page.params.activityId;
  export let loadComponent = "render";

  $: (async () => {
    if ($firebase) {
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("activities").doc(activityId);
    let snap = await ref.get();

    let object = await loadPluginData(activityId, snap, loadPluginData);
    cloneActivity = JSON.parse(JSON.stringify(object));
    activity = object;
  }
</script>
