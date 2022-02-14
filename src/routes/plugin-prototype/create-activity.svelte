<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import AddPlugin from "$lib/Internals/Plugin/AddPlugin.svelte";
  import AddInterruptPlugin from "$lib/Internals/Plugin/AddInterruptPlugin.svelte";
  import Table from "$lib/Internals/Table/Table.svelte";

  let firebase;
  let successId;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();

  // let selectedPlugin;
  let pluginForm;
  let title = "";
  let pluginData = {};

  let plugins = [];

  // $: (async () => {
  //   if (selectedPlugin && selectedPlugin.id) {
  //     pluginForm = await loadPlugin(selectedPlugin.id, "Form");
  //   }
  // })();

  async function submitForm() {
    let firestore = firebase.firestore();
    let data = {
      title: title,
    };

    data.plugins = getPluginDataFromForm(plugins);

    console.log(data);

    // data.plugins = [];
    // for (let i = 0; i < plugins.length; i++) {
    //   data = {
    //     ...data,
    //     ...getPluginDataFromForm(
    //       plugins[i].pluginConfig,
    //       plugins[i].data,
    //       plugins[i].order
    //     ),
    //   };
    //   data.plugins = [
    //     ...data.plugins,
    //     { pluginId: plugins[i].pluginConfig.id, order: plugins[i].order },
    //   ];
    // }
    firestore
      .collection("testplugin")
      .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        successId = docRef.id;
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

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
      parentPlugin.plugins = [...parentPlugin.plugins, newPlugin];
      topPlugin.currentPlugin = newPlugin;
    }
    if (!topPlugin.breadcrumb) {
      topPlugin.breadcrumb = [parentPlugin];
    } else {
      topPlugin.breadcrumb = [...topPlugin.breadcrumb, parentPlugin];
    }
    plugins = plugins;
  }

  // Every main plugin.
  // Parent.
  // CurrentPlugin.
  function toTop(topPlugin) {
    topPlugin.breadcrumb = [];
    topPlugin.currentPlugin = null;
    plugins = plugins;
  }

  function goToPlugin(parentPlugin, currentPlugin, topPlugin) {
    console.log(currentPlugin);
    if (!topPlugin.breadcrumb) {
      topPlugin.breadcrumb = [parentPlugin];
    } else {
      topPlugin.breadcrumb = [...topPlugin.breadcrumb, parentPlugin];
    }
    console.log("test");
    console.log(currentPlugin);
    topPlugin.currentPlugin = currentPlugin;
    plugins = plugins;
  }

  function goBack(topPlugin) {
    if (topPlugin.breadcrumb) {
      let parentPlugin = topPlugin.breadcrumb.pop();
      topPlugin.currentPlugin = parentPlugin;
      if (topPlugin.breadcrumb.length == 0) {
        topPlugin.currentPlugin = null;
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
</script>

{#if successId}
  <div class="text-green-400 bg-black-500">
    Test created with id: {successId}
  </div>
{/if}

{#if firebase}
  <h1 class="text-2xl font-semibold text-gray-900">Test form</h1>
  <AdditionalFormText content="Some test form for plug-ins" />

  <form
    class="mb-28 space-y-6 bg-gray-50"
    on:submit|preventDefault={submitForm}
  >
    <FieldSet title="General" layout="two-column-full-width-cards">
      <FormField labelPosition="top" title="Title">
        <TextInput bind:value={title} />
      </FormField>
    </FieldSet>

    {#each plugins as plugin}
      {#if plugin.breadcrumb.length == 0 && plugin.currentPlugin === null}
        <FieldSet
          title={plugin.pluginConfig.name}
          description={plugin.pluginConfig.description}
          layout="two-column-full-width-cards"
        >
          <svelte:component this={plugin.component} bind:data={plugin.data} />

          {#if plugin.plugins}
            <Table
              tableHeaders={["Plugin"]}
              tableBodyContents={plugin.pluginNames}
            >
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
                content="Parent: {plugin.breadcrumb[
                  plugin.breadcrumb.length - 1
                ].pluginConfig.name}"
              />
            {/if}
          </div>
          <svelte:component
            this={plugin.currentPlugin.component}
            bind:data={plugin.currentPlugin.data}
          />

          {#if plugin.currentPlugin.plugins}
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Plugin</th
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
                      <Button
                        size="small"
                        content="Edit"
                        on:click={() =>
                          goToPlugin(plugin.currentPlugin, subPlugin, plugin)}
                      />
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {/if}

          <AddInterruptPlugin
            on:addPlugin={(event) =>
              addInteruptPlugin(event, plugin.currentPlugin, plugin)}
          />
        </FieldSet>
      {/if}
    {/each}

    <AddPlugin on:addPlugin={addPlugin} />

    <!-- {#if selectedPlugin}
      <FieldSet
        title={selectedPlugin.name}
        description={selectedPlugin.description}
      >
        {#if pluginForm}
          {#if selectedPlugin.canBeInterupted}
            <FormField title="How do you want to make it interactive?">
              <PluginSelector bind:selectedPlugin filterCanBeInterupted={true}/></FormField
            >
          {/if}

          <svelte:component this={pluginForm} bind:data={pluginData} />
        {/if}
      </FieldSet>
    {/if} -->
    <Button
      color="primary"
      isSubmit={true}
      content="Submit new test plugin thingy"
    />
  </form>
{/if}
