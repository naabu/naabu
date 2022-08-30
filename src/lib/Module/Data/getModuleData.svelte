<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getUserModule } from "$lib/Module/Components/helper";
  import { loadPluginRecursively } from "$lib/Internals/Plugin/loader";
  import { user, player } from "$lib/Internals/User/store";
  
  export let module;
  export let mounted = false;
  export let moduleId = $page.params.moduleId;
  export let userModule;
  export let loadUserModule = true;
  export let loadComponent = "render";

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  $: (async () => {
    if (
      loadUserModule &&
      mounted &&
      module &&
      $player &&
      $player.id
    ) {
      userModule = await getUserModule(
       $firebase,
        module.id,
        module,
        $player
      );
      loadUserModule = false;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("modules").doc(moduleId);
    let snap = await ref.get();
    if (snap.exists) {
      let object = snap.data();
      object.id = ref.id;
      if (object.paths) {
        for (let i = 0; i < object.paths.length; i++) {
          let addPath = object.paths[i];
          addPath.points = JSON.parse(addPath.points);
        }
      }
      if (object.moduleDashboardPlugins) {
        object.moduleDashboardPlugins = JSON.parse(
          object.moduleDashboardPlugins
        );
        let loadPluginsObject = {
          plugins: object.moduleDashboardPlugins,
        };
        await loadPluginRecursively(loadPluginsObject, loadComponent);
        object.moduleDashboardPlugins = loadPluginsObject.plugins;
        for (let i = 0; i < object.moduleDashboardPlugins.length; i++) {
          object.moduleDashboardPlugins[i].currentPlugin =
            object.moduleDashboardPlugins[i];
        }
      }
      module = object;
    }
  }
</script>
