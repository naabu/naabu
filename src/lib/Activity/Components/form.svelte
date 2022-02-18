<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import "@algolia/autocomplete-theme-classic";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import QuizForm from "$lib/Activity/Components/quizzesForm.svelte";
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import PluginForm from "$lib/Internals/Plugin/form.svelte";

  const dispatch = createEventDispatcher();

  export let activity;

  export let typeOfActivityRadioOptions = [
    {
      value: "explanation",
      label: "Uitleg",
      description: "Activiteit bevat uitleg om het leerdoel te leren.",
    },
    {
      value: "practice",
      label: "Oefening",
      description: "Activiteit is een oefening voor het leerdoel.",
    },
    {
      value: "boss",
      label: "Eindbaas",
      description: "Een eindbaas type ontgrendeld de locaties op de kaart.",
    },
  ];

  function goBackToSearchGoals() {
    dispatch("toLearningGoals");
  }

  function updatePreview() {
    activity.description = renderKatexOutput(activity.descriptionRaw);
  }
</script>

<div class="mb-44 space-y-8 divide-y divide-gray-200 sm:space-y-5">
  <div>
    <FormField title="Leerdoel" forId="goal">
      <a href="/leerdoel/{activity.goalId}" class="underline"
        >{activity.goalTitle}</a
      >
      <div class="mt-3 block mb-1">
        <Button
          on:click={goBackToSearchGoals}
          size="small"
          content="Wijzigen"
        />
      </div>
    </FormField>
  </div>

  <FormField title="Type activiteit" forId="type_of_activity">
    <Radio
      bind:selectedValue={activity.type}
      options={typeOfActivityRadioOptions}
      id="type_of_activity"
    />
  </FormField>

  <FormField title="Titel" forId="title">
    <Textarea id="title" bind:value={activity.title} required={true} />
  </FormField>

  <FormField title="Beschrijving" forId="description">
    <Textarea id="description" bind:value={activity.descriptionRaw} rows="3" />
    <svelte:fragment slot="after">
      <AdditionalFormText content="Beschrijf kort de activiteit of de vraag" />
      <div class="mb-10 mt-3 block">
        <Button
          dataTest="preview-description"
          size="small"
          on:click={updatePreview}
          content="Update preview"
        />
      </div>

      {#if activity.description}
        {@html activity.description}
      {/if}
    </svelte:fragment>
  </FormField>
  <FormField title="Moeilijkheid" forId="difficulty">
    <NumberInput
      id="difficulty"
      min="1"
      max="5"
      bind:value={activity.difficulty}
    />
  </FormField>

  <FormField title="SVG" forId="svg">
    <Textarea id="svg" rows="5" bind:value={activity.svg} />
  </FormField>
<!-- 
  <FieldSet
    title="Video"
    description="Specificeer video gerelateerde informatie"
  >
    <FormField title="Vimeo" forId="vimeo_id">
      <NumberInput
        id="vimeo_id"
        title="Vimeo"
        bind:value={activity.video.vimeoId}
      />
    </FormField>
  </FieldSet> -->
<!-- 
  <FieldSet title="Quiz" description="Specificeer vragen en quizjes">
    <QuizForm bind:quizzes={activity.quizzes} showTimeInVideo={true} />
  </FieldSet> -->

  <FieldSet title="Plugins" description="Voeg functionaliteit toe">
    <PluginForm bind:plugins={activity.plugins} />
  </FieldSet>
</div>
