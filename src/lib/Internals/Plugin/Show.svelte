<script>
  import { loadPluginRecursively } from "$lib/Internals/Plugin/loader";
  export let object;
  export let finished = false;
  let loaded = false;
  let currentPlugin = null;
  let advance;
  let observe;
  let currentPluginIndex = 0;
  let interruptionPlugin = null;

  $: (async () => {
    if (!loaded) {
      loaded = true;
      await loadPluginComponents();
    }
  })();

  async function loadPluginComponents() {
    if (object && object.plugins) {
      let loadPluginsObject = {
        plugins: object.plugins,
      };
      await loadPluginRecursively(loadPluginsObject);
      object.plugins = loadPluginsObject.plugins;
      if (object.plugins.length > 0) {
        await setDataCurrentPlugin();
      }
    }
  }

  async function setDataCurrentPlugin() {
    let newCurrentPlugin = object.plugins[currentPluginIndex];
    if (newCurrentPlugin.pluginConfig.canBeInterrupted) {
      newCurrentPlugin.interruptions = [];
      if (newCurrentPlugin.plugins) {
        for (let i = 0; i < newCurrentPlugin.plugins.length; i++) {
          newCurrentPlugin.interruptions = [
            ...newCurrentPlugin.interruptions,
            {
              data: newCurrentPlugin.plugins[i].interruptionData,
              order: newCurrentPlugin.plugins[i].order,
            },
          ];
        }
      }
    }
    currentPlugin = newCurrentPlugin;
  }

  async function handleEndPlugin() {
    if (object.plugins.length > currentPluginIndex + 1) {
      currentPluginIndex = currentPluginIndex + 1;
      await setDataCurrentPlugin();
    } else {
      finished = true;
    }
  }

  async function handleInteruptPlugin(event) {
    if (event.detail.interruption) {
      for (let i = 0; i < currentPlugin.plugins.length; i++) {
        if (
          currentPlugin.plugins[i].order === event.detail.interruption.order
        ) {
          interruptionPlugin = currentPlugin.plugins[i];
          let canObserve = false;
          if (currentPlugin.pluginConfig.canBeObserved) {
            canObserve = true;
          }
          interruptionPlugin.canObserve = canObserve;

          break;
        }
      }
    }
  }

  function handleInterruptionEndPlugin() {
    if (advance) {
      advance();
    }
  }

  function observeParent() {
    if (
      currentPlugin.pluginConfig &&
      currentPlugin.pluginConfig.canBeObserved &&
      observe
    ) {
      observe();
    }
  }

  function observeComplete() {}
</script>

{#if object}
  {#if currentPlugin !== null}
    {#if currentPlugin.pluginConfig && currentPlugin.pluginConfig.canBeInterrupted}
      <svelte:component
        this={currentPlugin.component}
        bind:data={currentPlugin.data}
        bind:interruptions={currentPlugin.interruptions}
        on:interrupt={handleInteruptPlugin}
        on:end={handleEndPlugin}
        on:observeComplete={observeComplete}
        bind:advance
        bind:observe
      >
        <svelte:fragment slot="interruption">
          {#if interruptionPlugin && interruptionPlugin !== null}
            {#if interruptionPlugin.pluginConfig.canObserve && interruptionPlugin.canObserve}
              <svelte:component
                this={interruptionPlugin.component}
                bind:data={interruptionPlugin.data}
                canObserve={true}
                on:end={handleInterruptionEndPlugin}
                on:observeParent={observeParent}
              />
            {:else}
              <svelte:component
                this={interruptionPlugin.component}
                bind:data={interruptionPlugin.data}
                on:end={handleInterruptionEndPlugin}
                on:observeParent={observeParent}
              />
            {/if}
          {/if}
        </svelte:fragment>
      </svelte:component>
    {:else}
      <svelte:component
        this={currentPlugin.component}
        bind:data={currentPlugin.data}
        on:end={handleEndPlugin}
      />{/if}
  {/if}
{/if}
