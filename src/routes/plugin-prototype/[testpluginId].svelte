<script>
  import { getStores, page } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { handlePluginCreation } from "$lib/Internals/Plugin/data";
  import { loadPlugin, loadPluginConfig } from "$lib/Internals/Plugin/loader";
  let testObject;
  let mounted = false;
  let loaded = false;
  let firebase;
  let pluginComponents = [];
  let currentPlugin = null;
  let advance;
  let observe;

  $: {
    console.log(currentPlugin);
    console.log(testObject);
  }

  let currentPluginIndex = 0;
  let interruptionPlugin = null;

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
          console.log(testObject);
        }
      }
      mounted = true;
    }
  })();

  $: (async () => {
    if (mounted && !loaded) {
      loaded = true;
      await loadPluginComponents();
    }
  })();

  async function loadPluginRecursivly(plugin) {
    for (let i = 0; i < plugin.plugins.length; i++) {
      let childPlugin = plugin.plugins[i];
      if (childPlugin !== null && childPlugin.pluginId) {
        plugin.plugins[i].component = await loadPlugin(
          childPlugin.pluginId,
          "Render"
        );
        plugin.plugins[i].pluginConfig = await loadPluginConfig(
          childPlugin.pluginId
        );
        if (childPlugin.plugins) {
          await loadPluginRecursivly(childPlugin);
        }
      }
    }
  }

  async function loadPluginComponents() {
    await loadPluginRecursivly(testObject);
    if (testObject.plugins.length > 0) {
      await setDataCurrentPlugin();
    }
  }

  async function setDataCurrentPlugin() {
    let newCurrentPlugin = testObject.plugins[currentPluginIndex];
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
    if (testObject.plugins.length > currentPluginIndex + 1) {
      currentPluginIndex = currentPluginIndex + 1;
      await setDataCurrentPlugin();
    } else {
      currentPlugin = null;
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

{#if testObject}
  <h1 class="font-bold text-lg">
    {testObject.title}
  </h1>

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
  {:else}
    <p>There are no plugins to render.</p>
  {/if}
{/if}
