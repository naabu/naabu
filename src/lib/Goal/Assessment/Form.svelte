<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import PluginForm from "$lib/Internals/Plugin/Form.svelte";
  import { t } from "svelte-intl-precompile";
  import ShowPlugins from "$lib/Internals/Plugin/ShowActivityPlugins.svelte";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { loadPluginDataFromFirestore } from "$lib/Internals/Plugin/loader";
  import Button from "$lib/Internals/Button/Button.svelte";
  export let assessment;
  export let firebase;

  let currentPluginIndex = 0;
  let renderAssessment = {
    plugins: null,
  };

  async function refreshPreview() {
    if (assessment.plugins) {
      let pluginData = getPluginDataFromForm(assessment.plugins);
      let renderPlugins = await loadPluginDataFromFirestore(pluginData);
      renderAssessment.plugins = renderPlugins;
      currentPluginIndex = 0;
    }
  }
  let pluginFinished = false;
</script>

<FieldSet title={$t("assessment")} description={$t("assessment-description")}>
  <FormField title={$t("title")} forId="title-textarea">
    <Textarea bind:value={assessment.title} id="title-textarea" />
  </FormField>
  <FormField title={$t("description")} forId="description">
    <Textarea id="description" bind:value={assessment.description} rows="3" />
  </FormField>
</FieldSet>

<PluginForm bind:plugins={assessment.plugins} />

<Button
  color="secondary"
  content={$t("update-preview")}
  on:click={refreshPreview}
/>

{#if renderAssessment.plugins && renderAssessment.plugins.length > 0}
  <ShowPlugins
    bind:firebase
    bind:object={renderAssessment}
    bind:finished={pluginFinished}
    bind:currentPluginIndex
  />
{/if}
