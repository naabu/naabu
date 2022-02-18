<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import AddPlugin from "$lib/Internals/Plugin/AddPlugin.svelte";
  import AddInterruptPlugin from "$lib/Internals/Plugin/AddInterruptPlugin.svelte";
  import Table from "$lib/Internals/Table/Table.svelte";
  export let plugins = [];

  function addPlugin(event) {
    if (event.detail.component) {
      let newPlugin = {
        order: plugins.length,
        pluginConfig: event.detail.pluginConfig,
        component: event.detail.component,
        data: {},
        breadcrumb: [],
        currentPlugin: null,
      };
      if (event.detail.interruptionForm) {
        newPlugin.interruptionForm = event.detail.interruptionForm;
      }
      plugins = [...plugins, newPlugin];
    }
  }

  function addInteruptPlugin(event, parentPlugin, topPlugin) {
    if (!parentPlugin.plugins) {
      parentPlugin.plugins = [];
    }
    if (event.detail.component) {
      let newPlugin = {
        order: parentPlugin.plugins.length,
        pluginConfig: event.detail.pluginConfig,
        component: event.detail.component,
        data: {},
      };
      if (event.detail.interruptionForm) {
        newPlugin.interruptionForm = event.detail.interruptionForm;
      }
      parentPlugin.plugins = [...parentPlugin.plugins, newPlugin];
      topPlugin.currentPlugin = newPlugin;
      topPlugin.currentPlugin.parentPlugin = parentPlugin;
    }
    if (!topPlugin.breadcrumb) {
      topPlugin.breadcrumb = [parentPlugin];
    } else {
      topPlugin.breadcrumb = [...topPlugin.breadcrumb, parentPlugin];
    }
    plugins = plugins;
  }

  function toTop(topPlugin) {
    topPlugin.breadcrumb = [];
    topPlugin.currentPlugin = null;
    plugins = plugins;
  }

  function goToPlugin(parentPlugin, currentPlugin, topPlugin) {
    if (!topPlugin.breadcrumb) {
      topPlugin.breadcrumb = [parentPlugin];
    } else {
      topPlugin.breadcrumb = [...topPlugin.breadcrumb, parentPlugin];
    }
    topPlugin.currentPlugin = currentPlugin;
    topPlugin.currentPlugin.parentPlugin = parentPlugin;
    plugins = plugins;
  }

  function goBack(topPlugin) {
    if (topPlugin.breadcrumb) {
      let parentPlugin = topPlugin.breadcrumb.pop();
      topPlugin.currentPlugin = parentPlugin;
      if (topPlugin.breadcrumb.length == 0) {
        topPlugin.currentPlugin = null;
      } else {
        topPlugin.currentPlugin.parentPlugin =
          topPlugin.breadcrumb[topPlugin.breadcrumb.length - 1];
      }
    }
    plugins = plugins;
  }

  $: if (plugins) {
    for (let i = 0; i < plugins.length; i++) {
      let pluginNames = [];
      if (
        plugins[i].currentPlugin !== null &&
        plugins[i].currentPlugin.plugins
      ) {
        for (let i2 = 0; i2 < plugins[i].currentPlugin.plugins.length; i2++) {
          pluginNames.push([
            plugins[i].currentPlugin.plugins[i2].pluginConfig.name,
          ]);
        }
      } else if (plugins[i].plugins) {
        for (let i2 = 0; i2 < plugins[i].plugins.length; i2++) {
          pluginNames.push([plugins[i].plugins[i2].pluginConfig.name]);
        }
      }
      plugins[i].pluginNames = pluginNames;
    }
  }

  function deleteInterruptionPlugin() {
    console.log("Delete interruption plugion");
  }
</script>

{#each plugins as plugin}
  {#if plugin.breadcrumb.length == 0 && plugin.currentPlugin === null}
    <FieldSet
      title={plugin.pluginConfig.name}
      description={plugin.pluginConfig.description}
      layout="two-column-full-width-cards"
    >
      <svelte:component this={plugin.component} bind:data={plugin.data} />

      {#if plugin.plugins}
        <Table tableHeaders={["Plugin"]} tableBodyContents={plugin.pluginNames}>
          <svelte:fragment slot="action" let:i>
            <Button
              size="small"
              content="Edit"
              on:click={() => goToPlugin(plugin, plugin.plugins[i], plugin)}
            />
          </svelte:fragment>
        </Table>
      {/if}

      <AddInterruptPlugin
        on:addPlugin={(event) => addInteruptPlugin(event, plugin, plugin)}
      />
    </FieldSet>
  {:else}
    <FieldSet
      title={plugin.currentPlugin.pluginConfig.name}
      description={plugin.currentPlugin.pluginConfig.description}
      layout="two-column-full-width-cards"
    >
      <div slot="top">
        {#if plugin.breadcrumb[plugin.breadcrumb.length - 1]}
          <Button
            size="very-small"
            content="To top"
            on:click={() => toTop(plugin)}
          />
          <Button
            size="very-small"
            content="Go back"
            on:click={() => goBack(plugin)}
          />
          <AdditionalFormText
            content="Parent: {plugin.breadcrumb[plugin.breadcrumb.length - 1]
              .pluginConfig.name}"
          />
        {/if}
      </div>

      {#if plugin.currentPlugin.parentPlugin.pluginConfig.interruptionFields}
        <svelte:component
          this={plugin.currentPlugin.parentPlugin.interruptionForm}
          bind:data={plugin.currentPlugin.interruptionData}
        />
      {/if}

      <svelte:component
        this={plugin.currentPlugin.component}
        bind:data={plugin.currentPlugin.data}
      />
<!-- 
      {#if plugin.currentPlugin.plugins}
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Pluginasdfsdasdfasdff</th
              >
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each plugin.currentPlugin.plugins as subPlugin, i}
              <tr class:bg-white={i % 2 == 0} class:bg-gray-50={i % 2 != 0}>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >{subPlugin.pluginConfig.name}</td
                >
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  What is going on?
                  <Button
                    size="small"
                    content="Edit?"
                    on:click={() =>
                      goToPlugin(plugin.currentPlugin, subPlugin, plugin)}
                  />
                  <Button
                    size="tiny"
                    color="lightRed"
                    content="Delete"
                    on:click={() => deleteInterruptionPlugin()}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if} -->
<!-- 
      <AddInterruptPlugin
        on:addPlugin={(event) =>
          addInteruptPlugin(event, plugin.currentPlugin, plugin)}
      /> -->
    </FieldSet>
  {/if}
{/each}

<AddPlugin on:addPlugin={addPlugin} />
