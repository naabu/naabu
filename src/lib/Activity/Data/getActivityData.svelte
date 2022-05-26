<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { loadPluginRecursively } from "$lib/Internals/Plugin/loader";

 

  export let activity;
  export let cloneActivity;
  export let mounted = false;
  export let activityId = $page.params.activityId;
  export let loadComponent = "render";

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("activities").doc(activityId);
    let snap = await ref.get();
    if (snap.exists) {
      let object = snap.data();
      object.id = ref.id;

      if (object.plugins) {
        object.plugins = JSON.parse(object.plugins);
        cloneActivity = JSON.parse(JSON.stringify(object));
        let loadPluginsObject = {
          plugins: object.plugins,
        };
        await loadPluginRecursively(loadPluginsObject, loadComponent);
        object.plugins = loadPluginsObject.plugins;
        for (let i = 0; i < object.plugins.length; i++) {
          object.plugins[i].currentPlugin = object.plugins[i];
        }
      } else {
        cloneActivity = JSON.parse(JSON.stringify(object));
      }
      if (object.goalId) {
        let battleCol = db.collection("goals/" + object.goalId + "/battles");
        const querySnapshot = await battleCol.get();
        object.battles = [];
        querySnapshot.forEach((doc) => {
          let battleObject = doc.data();
          battleObject.name = doc.id;
          object.battles = [...object.battles, battleObject];
        });
      }
      activity = object;
    }
  }
</script>
