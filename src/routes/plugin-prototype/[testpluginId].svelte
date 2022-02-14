<script>
  import { getStores, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { handlePluginCreation } from "$lib/Internals/Plugin/data";
  import { loadPlugin } from "$lib/Internals/Plugin/loader";
  let testObject;
  let mounted = false;
  let firebase;
  let pluginComponents = [];
  let currentPlugin = null;
  let currentPluginIndex = 0;

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
            testObject.plugins[i].component = await loadPlugin(
              plugin.pluginId,
              "Render"
            );
          }
          if (testObject.plugins.length > 0) {
            currentPlugin = testObject.plugins[currentPluginIndex];
          }
        }
      }
      mounted = true;
    }
  })();

  function handleEndPlugin() {
    if (testObject.plugins.length > currentPluginIndex + 1) {
      currentPluginIndex = currentPluginIndex + 1;
      currentPlugin = testObject.plugins[currentPluginIndex];
    } else {
      currentPlugin = null;
    }
  }
</script>

{#if testObject}
  <h1 class="font-bold text-lg">
    {testObject.title}
  </h1>

  {#if currentPlugin !== null}
    <!-- This is the start event, rendering the component. -->
    <svelte:component
      this={currentPlugin.component}
      bind:data={currentPlugin.data}
      on:end={handleEndPlugin}
    />
  {:else}
    <p>There are no plugins to render.</p>
  {/if}
{/if}
