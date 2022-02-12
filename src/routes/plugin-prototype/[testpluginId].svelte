<script>
  import { getStores, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { handlePluginCreation } from "$lib/Internals/Plugin/data";
  import { loadPlugin } from "$lib/Internals/Plugin/loader";
  let testObject;
  let mounted = false;
  let firebase;
  let pluginComponents = [];

  $: (async () => {
    if ($firebaseStore && !mounted) {
      firebase = $firebaseStore;
      let db = await firebase.firestore();
      let ref = db.collection("testplugin").doc($page.params.testpluginId);
      let snap = await ref.get();
      if (snap.exists) {
        testObject = snap.data();
        testObject.id = testObject.id;
        if (testObject.plugins) {
          testObject.plugins = JSON.parse(testObject.plugins);
          for (let i = 0; i < testObject.plugins.length; i++) {
            let plugin = testObject.plugins[i];
            testObject.plugins[i].component = await loadPlugin(plugin.pluginId, "Render");
          }
        }
      }
      mounted = true;
    }
  })();
</script>

{#if testObject}
  {testObject.title}

  {#each testObject.plugins as plugin}
    <div>
      <svelte:component this={plugin.component} bind:data={plugin.data} />
    </div>
  {/each}
{/if}
