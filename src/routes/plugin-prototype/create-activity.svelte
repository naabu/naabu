<script>
  import { loadPlugin } from "$lib/Internals/Plugin/loader";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import PluginSelector from "$lib/Internals/Plugin/Selector.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import AddPlugin from "$lib/Internals/Plugin/AddPlugin.svelte";
  import { debug } from "svelte/internal";

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
      };
      plugins = [...plugins, newPlugin];
    }
  }

  $: console.log(plugins);
</script>

{#if successId}
  <div class="text-green-400 bg-black-500">
    Test created with id: {successId}
  </div>
{/if}

{#if firebase}
  <h1 class="text-2xl font-semibold text-gray-900">Test form</h1>
  <AdditionalFormText content="Some test form for plug-ins" />

  <form class="mb-28" on:submit|preventDefault={submitForm}>
    <FieldSet>
      <FormField title="Title">
        <TextInput bind:value={title} />
      </FormField>
      <!-- <FormField title="Select your plugin"> -->
      <!-- Lets also make this a multi checkbox or multiselect 
          or maybe something custom.
        -->
      <!-- <PluginSelector bind:selectedPlugin /></FormField -->
      <!-- > -->
    </FieldSet>

    {#each plugins as plugin}
      <svelte:component this={plugin.component} bind:data={plugin.data} />
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
