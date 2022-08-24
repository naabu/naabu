<script>
  import { loadPluginRecursively } from "$lib/Internals/Plugin/loader";
  import { createEventDispatcher } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  export let object;
  export let finished = false;

  export let currentPluginIndex = 0;
  let plugins;
  let loaded = false;
  let currentPlugin = null;
  let advance;
  let observe;

  let interruptionPlugin = null;

  const dispatch = createEventDispatcher();

  $: (async () => {
    if (!loaded) {
      loaded = true;
      await loadPluginComponents();
    }
  })();

  $: (async () => {
    if (loaded && object.plugins) {
      await loadPluginComponents();
    }
  })();

  async function loadPluginComponents() {
    if (object && object.plugins) {
      let loadPluginsObject = {
        plugins: object.plugins,
      };
      await loadPluginRecursively(loadPluginsObject);
      plugins = loadPluginsObject.plugins;
      if (plugins.length > 0) {
        await setDataCurrentPlugin();
      }
    }
  }

  async function setDataCurrentPlugin() {
    console.log("begin setDataCurrentPlugin")
    console.log(plugins)
    let newCurrentPlugin = plugins[currentPluginIndex];
    newCurrentPlugin.exerciseAttemptNumber = 1;

    newCurrentPlugin.exerciseStartTime = $firebase.firestore.Timestamp.now().seconds;

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
          newCurrentPlugin.plugins[i].exerciseAttemptNumber = 1;
          newCurrentPlugin.plugins[
            i
          ].exerciseStartTime = $firebase.firestore.Timestamp.now().seconds;
        }
      }
    }
    console.log(newCurrentPlugin)
    console.log("end setDataCurrentPlugin")

    currentPlugin = newCurrentPlugin;
  }

  async function handleEndPlugin() {
    if (plugins.length > currentPluginIndex + 1) {
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
          interruptionPlugin.interuptionId = i + 1;
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

  function exerciseAttempt(event, pluginFired) {
    let isCorrect = false;
    if (event.detail.isCorrect) {
      isCorrect = event.detail.isCorrect;
    }

    let currentTime = $firebase.firestore.Timestamp.now().seconds;

    let answerGiven = "";
    if (event.detail.answerGiven) {
      answerGiven = event.detail.answerGiven;
    }

    let lowLevelDataObject = {
      exerciseAnswerGiven: answerGiven,
      exerciseAttemptNumber: pluginFired.exerciseAttemptNumber,
      exerciseData: JSON.stringify(pluginFired.data),
      exerciseStartTime: pluginFired.exerciseStartTime,
      exerciseTimeIn: currentTime - pluginFired.exerciseStartTime,
      exerciseIsCorrect: isCorrect,
      type: "exercise",
    };

    if (interruptionPlugin !== null && interruptionPlugin.interuptionId) {
      lowLevelDataObject.isInterruption = true;
      lowLevelDataObject.interruptionId = interruptionPlugin.interuptionId;
    }

    dispatch("lowLevelData", { lowLevelData: lowLevelDataObject });

    pluginFired.exerciseAttemptNumber = pluginFired.exerciseAttemptNumber + 1;
  }

  function observeComplete() {}
</script>

{#if object}
  {#if currentPlugin !== null}
    {#if currentPlugin.pluginConfig && currentPlugin.pluginConfig.canBeInterrupted}
      <svelte:component
        this={currentPlugin.component}
        data={currentPlugin.data}
        bind:interruptions={currentPlugin.interruptions}
        on:interrupt={handleInteruptPlugin}
        on:end={handleEndPlugin}
        on:observeComplete={observeComplete}
        on:exerciseAttempt={(event) => exerciseAttempt(event, currentPlugin)}
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
                on:exerciseAttempt={(event) =>
                  exerciseAttempt(event, interruptionPlugin)}
              />
            {:else}
              <svelte:component
                this={interruptionPlugin.component}
                bind:data={interruptionPlugin.data}
                on:end={handleInterruptionEndPlugin}
                on:observeParent={observeParent}
                on:exerciseAttempt={(event) =>
                  exerciseAttempt(event, interruptionPlugin)}
              />
            {/if}
          {/if}
        </svelte:fragment>
      </svelte:component>
    {:else}
      <svelte:component
        this={currentPlugin.component}
        data={currentPlugin.data}
        on:end={handleEndPlugin}
        on:exerciseAttempt={(event) => exerciseAttempt(event, currentPlugin)}
      />{/if}
  {/if}
{/if}
