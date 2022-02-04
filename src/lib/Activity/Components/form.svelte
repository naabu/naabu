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
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="goal"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Leerdoel
        </label>

        <div class="mt-1 sm:mt-0 sm:col-span-2">
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
        </div>
      </div>
    </div>
  </div>

  <Radio
    bind:selectedValue={activity.type}
    options={typeOfActivityRadioOptions}
    title="Type activiteit"
  />

  <div>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <Textarea
        id="title"
        title="Titel"
        bind:value={activity.title}
        required={true}
      />

      <Textarea
        id="description"
        title="Beschrijving"
        bind:value={activity.descriptionRaw}
        rows="3"
      >
        <svelte:fragment slot="after">
          <p class="mt-2 text-sm text-gray-500">
            Beschrijf kort de activiteit of de vraag
          </p>
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
      </Textarea>
    </div>
  </div>

  <NumberInput
    id="difficulty"
    title="Moeilijkheid"
    min="1"
    max="5"
    bind:value={activity.difficulty}
  />

  <Textarea id="svg" title="SVG" rows="5" bind:value={activity.svg} />

  <FieldSet
    title="Video"
    description="Specificeer video gerelateerde informatie"
  >
    <NumberInput
      id="vimeo_id"
      title="Vimeo"
      bind:value={activity.video.vimeoId}
    />
  </FieldSet>

  <FieldSet title="Quiz" description="Specificeer vragen en quizjes">
    <QuizForm bind:quizzes={activity.quizzes} showTimeInVideo={true} />
  </FieldSet>
</div>
