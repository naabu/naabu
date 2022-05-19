<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import { t } from "svelte-intl-precompile";
  export let model;
</script>

<FieldSet title={$t("model")} description={$t("model-description")}>
  <FormField title={$t("title")} forId="title-textarea">
    <Textarea bind:value={model.title} id="title-textarea" />
  </FormField>
  <FormField title={$t("description")} forId="description">
    <Textarea id="description" bind:value={model.description} rows="3" />
  </FormField>

  <FormField title={$t("problem")} forId="problem-state">
    <Textarea id="problem-state" bind:value={model.problemState} rows="3" />
  </FormField>

  <FormField title={$t("solution")} forId="solution-state">
    <Textarea id="solution-state" bind:value={model.solutionState} rows="3" />
  </FormField>
</FieldSet>
