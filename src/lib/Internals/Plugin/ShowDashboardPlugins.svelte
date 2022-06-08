<script>
  import { loadPluginRecursively } from "$lib/Internals/Plugin/loader";
  export let dashboardPlugins;
  export let modelData;
  let loaded = false;

  $: (async () => {
    if (!loaded) {
      loaded = true;
      await loadPluginComponents();
    }
  })();

  async function loadPluginComponents() {
    if (dashboardPlugins) {
      let loadPluginsObject = {
        plugins: dashboardPlugins,
      };
      await loadPluginRecursively(loadPluginsObject);
      dashboardPlugins = loadPluginsObject.plugins;
    }
  }
</script>

{#each dashboardPlugins as dashboardPlugin}
  <svelte:component
    this={dashboardPlugin.component}
    bind:data={dashboardPlugin.data}
    bind:modelData
  />
{/each}
