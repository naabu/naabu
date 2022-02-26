<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import AddPlugin from "$lib/Internals/Plugin/AddPlugin.svelte";
  import AddInterruptPlugin from "$lib/Internals/Plugin/AddInterruptPlugin.svelte";
  import Table from "$lib/Internals/Table/Table.svelte";
  import { t } from "svelte-intl-precompile";

  export let plugins = [];

  function addPlugin(event) {
    if (event.detail.component) {
      let newPlugin = {
        order: plugins.length,
        pluginConfig: event.detail.pluginConfig,
        component: event.detail.component,
        data: {},
        breadcrumb: [],
      };
      if (event.detail.interruptionForm) {
        newPlugin.interruptionForm = event.detail.interruptionForm;
      }
      newPlugin.currentPlugin = newPlugin;
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
    topPlugin.currentPlugin = topPlugin;
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
        topPlugin.currentPlugin = topPlugin;
      } else {
        topPlugin.currentPlugin.parentPlugin =
          topPlugin.breadcrumb[topPlugin.breadcrumb.length - 1];
      }
    }
    plugins = plugins;
  }

  $: if (plugins) {
    for (let i = 0; i < plugins.length; i++) {
      let pluginTable = [];
      if (plugins[i].currentPlugin && plugins[i].currentPlugin !== null) {
        if (plugins[i].currentPlugin.plugins) {
          for (let i2 = 0; i2 < plugins[i].currentPlugin.plugins.length; i2++) {
            let fieldString = [];
            if (
              plugins[i].currentPlugin.plugins[i2].parentPlugin &&
              plugins[i].currentPlugin.plugins[i2].parentPlugin.pluginConfig
                .interruptionFields
            ) {
              let interruptionFields =
                plugins[i].currentPlugin.plugins[i2].parentPlugin.pluginConfig
                  .interruptionFields;

              for (let i = 0; i < interruptionFields.length; i++) {
                if (
                  plugins[i].currentPlugin.plugins[i2].interruptionData[
                    interruptionFields[i].id
                  ]
                ) {
                  fieldString.push(
                    interruptionFields[i].name +
                      ": " +
                      plugins[i].currentPlugin.plugins[i2].interruptionData[
                        interruptionFields[i].id
                      ]
                  );
                }
              }
            }
            let interruptionString = fieldString.join(", ");
            pluginTable.push([
              plugins[i].currentPlugin.plugins[i2].pluginConfig.name,
              interruptionString,
            ]);
          }
        }
      } else if (plugins[i].plugins) {
        for (let i2 = 0; i2 < plugins[i].plugins.length; i2++) {
          pluginTable.push([plugins[i].plugins[i2].pluginConfig.name]);
        }
      }
      plugins[i].pluginTable = pluginTable;

      //   [ [ colunn1, column2 ],
      // [row 2],   ]
    }
  }

  function deleteMainPlugin(mainPluginIndex) {
    plugins.splice(mainPluginIndex, 1);
    plugins = plugins;
  }

  function deleteInterruptionPlugin(mainPluginIndex, pluginIndex) {
    if (plugins[mainPluginIndex].currentPlugin === null) {
      plugins[mainPluginIndex].plugins.splice(pluginIndex, 1);
    } else {
      plugins[mainPluginIndex].currentPlugin.plugins.splice(pluginIndex, 1);
    }
    plugins = plugins;
  }
</script>

{#each plugins as plugin, mainPluginIndex}
  <FieldSet
    title={plugin.currentPlugin.pluginConfig.name}
    description={plugin.currentPlugin.pluginConfig.description}
    layout="two-column-full-width-cards"
  >
    <div slot="top">
      {#if plugin.breadcrumb[plugin.breadcrumb.length - 1]}
        <Button
          size="very-small"
          content={$t("to-top")}
          on:click={() => toTop(plugin)}
        />
        <Button
          size="very-small"
          content={$t("back")}
          on:click={() => goBack(plugin)}
        />
        <AdditionalFormText
          content="{$t("parent")} : {plugin.breadcrumb[plugin.breadcrumb.length - 1]
            .pluginConfig.name}"
        />
      {/if}
    </div>

    {#if plugin.currentPlugin.parentPlugin && plugin.currentPlugin.parentPlugin.pluginConfig.interruptionFields}
      <svelte:component
        this={plugin.currentPlugin.parentPlugin.interruptionForm}
        bind:data={plugin.currentPlugin.interruptionData}
      />
    {/if}

    <svelte:component
      this={plugin.currentPlugin.component}
      bind:data={plugin.currentPlugin.data}
    />

    {#if plugin.currentPlugin.plugins}
      <Table
        tableHeaders={[$t("plugin"), $t("onderbreking"), $t("acties")]}
        tableBodyContents={plugin.currentPlugin.pluginTable}
      >
        <svelte:fragment slot="action" let:i>
          <Button
            size="tiny"
            content={$t("edit")}
            dataTest="edit-plugin-{i}-button"
            on:click={() =>
              goToPlugin(
                plugin.currentPlugin,
                plugin.currentPlugin.plugins[i],
                plugin
              )}
          />
          <Button
            dataTest="delete-plugin-{i}-button"
            size="tiny"
            color="lightRed"
            content={$t("delete")}
            on:click={() => deleteInterruptionPlugin(mainPluginIndex, i)}
          />
        </svelte:fragment>
      </Table>
    {/if}

    <AddInterruptPlugin
      bind:canBeInterrupted={plugin.currentPlugin.pluginConfig.canBeInterrupted}
      on:addPlugin={(event) =>
        addInteruptPlugin(event, plugin.currentPlugin, plugin)}
    />
  </FieldSet>
{/each}

<AddPlugin on:addPlugin={addPlugin} />
