<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import "@algolia/autocomplete-theme-classic";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import PluginForm from "$lib/Internals/Plugin/Form.svelte";
  import { t } from "svelte-intl-precompile";
 import DOMPurify from 'dompurify';


  const dispatch = createEventDispatcher();

  export let activity;
  export let showGoalForm = true;
  export let userChangedTitle = false;

  export let typeOfActivityRadioOptions = [
    {
      value: "explanation",
      label: $t("explanation"),
      description: $t("explanation_description"),
    },
    {
      value: "practice",
      label: $t("practice"),
      description: $t("practice_description"),
    }
  ];

  function goBackToSearchGoals() {
    dispatch("toLearningGoals");
  }

  function updatePreview() {
    activity.description = renderKatexOutput(activity.descriptionRaw);
  }
</script>

<div class="mb-44 space-y-8 divide-y divide-gray-200 sm:space-y-5">
  {#if showGoalForm}
    <div>
      <FormField title="Leerdoel" forId="goal">
        <a href="/leerdoel/{activity.goalId}" class="underline"
          >{activity.goalTitle}</a
        >
        <div class="mt-3 block mb-1">
          <Button
            on:click={goBackToSearchGoals}
            size="small"
            content={$t("modify")}
          />
        </div>
      </FormField>
    </div>
  {/if}

  <FormField title={$t("type-activity")} forId="type_of_activity">
    <Radio
      bind:selectedValue={activity.type}
      options={typeOfActivityRadioOptions}
      id="type_of_activity"
    />
  </FormField>

  <FormField title={$t("title")} forId="title">
    <Textarea id="title" bind:value={activity.title} on:input={() => userChangedTitle = true} required={true} />
  </FormField>
  <FormField title={$t("difficulty")} forId="difficulty">
    <NumberInput
      id="difficulty"
      min="1"
      max="5"
      bind:value={activity.difficulty}
    />
  </FormField>

  <PluginForm bind:plugins={activity.plugins} />
</div>
