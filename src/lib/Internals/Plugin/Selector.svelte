<script>
  import {
    loadPlugin,
    loadPluginsConfiguration,
  } from "$lib/Internals/Plugin/loader";
  import Transition from "svelte-class-transition";
  import Button from "$lib/Internals/Button/Button.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import { t } from "svelte-intl-precompile";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let toggle = true;
  export let filterType = "activity";
  export let filterInterrupt = false;
  let pluginsConfiguration = [];

  let pluginsToSelect = [];

  $: (async () => {
    pluginsConfiguration = await loadPluginsConfiguration();
  })();

  $: if (pluginsConfiguration && pluginsConfiguration.length > 0) {
    pluginsToSelect = [];
    for (let i = 0; i < pluginsConfiguration.length; i++) {
      if (
        pluginsConfiguration[i].type === filterType &&
        (!filterInterrupt || pluginsConfiguration[i].canInterrupt)
      ) {
        pluginsToSelect.push({
          name: pluginsConfiguration[i].name,
          description: pluginsConfiguration[i].description,
          value: pluginsConfiguration[i],
        });
      }
    }
  }

  async function addPlugin(pluginConfig) {
    let plugin = {
      pluginConfig: pluginConfig,
      component: await loadPlugin(pluginConfig.id, "Form"),
    };

    if (pluginConfig.interruptionFields) {
      plugin.interruptionForm = await loadPlugin(
        pluginConfig.id,
        "InterruptionForm"
      );
    }

    dispatch("add", plugin);
    toggle = false;
  }
</script>

<div class="fixed inset-y-16 right-0 max-w-full flex z-20">
  <Transition
    {toggle}
    inTransition="transform transition ease-in-out duration-500 sm:duration-700"
    inState="translate-x-full"
    onState="translate-x-0"
    outTransition="transform transition ease-in-out duration-200 sm:duration-300"
    outState="translate-x-full"
  >
    <div class="w-screen max-w-2xl">
      <div
        class="h-full flex flex-col py-6 bg-white shadow-inner overflow-y-scroll"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
              {$t("add-new-plugins-text")}
            </h2>
            <div class="ml-3 h-7 flex items-center">
              <button
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                on:click={() => (toggle = false)}
              >
                <span class="sr-only">{$t("close-panel")}</span>

                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-6 relative flex-1 px-4 sm:px-6">
          {#each pluginsToSelect as pluginOption}
            <div class="col-span-1 flex">
              <div class="flex-1 px-4 py-2 text-sm truncate">
                <p class="text-gray-900 font-medium">
                  {$t(pluginOption.name)}
                </p>
                <AdditionalFormText content={$t(pluginOption.description)} />
              </div>
              <div class="flex-shrink-0 pr-2">
                <Button
                  dataTest="plugin-option-{pluginOption.value.id}"
                  on:click={() => addPlugin(pluginOption.value)}
                  content={$t("add")}
                />
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </Transition>
</div>
