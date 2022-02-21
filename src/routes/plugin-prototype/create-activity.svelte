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
  import PluginForm from "$lib/Internals/Plugin/Form.svelte";

  let firebase;
  let successId;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();

  let title = "";
  let plugins = [];

  async function submitForm() {
    let firestore = firebase.firestore();
    let data = {
      title: title,
    };

    data.plugins = getPluginDataFromForm(plugins);

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

    <PluginForm bind:plugins/>

    <Button
      color="primary"
      isSubmit={true}
      content="Submit new test plugin thingy"
    />
  </form>
{/if}
