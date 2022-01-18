<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import "@algolia/autocomplete-theme-classic";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import QuizForm from "$lib/Activity/Components/quizzesForm.svelte";
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  const dispatch = createEventDispatcher();

  export let activity;

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
  <div class="mt-6 sm:border-t sm:border-gray-200 sm:pt-5">
    <div role="group" aria-labelledby="label-type">
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
        <div>
          <div
            class="mb-40text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
            id="label-type"
          >
            Type activity
          </div>
        </div>
        <div class="mt-4 sm:mt-0 sm:col-span-2">
          <div class="max-w-lg space-y-4">
            <div>
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="explanation"
                    name="explanation"
                    value="explanation"
                    bind:group={activity.type}
                    type="radio"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="multistructureel"
                    class="font-medium text-gray-700">Uitleg</label
                  >
                  <p class="text-gray-500">
                    Activiteit bevat uitleg om het leerdoel te leren.
                  </p>
                </div>
              </div>
            </div>
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="practice"
                  name="practice"
                  value="practice"
                  bind:group={activity.type}
                  type="radio"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="unistructureel" class="font-medium text-gray-700"
                  >Oefening</label
                >
                <p class="text-gray-500">
                  Activiteit is een oefening voor het leerdoel.
                </p>
              </div>
            </div>
            <div>
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="boss"
                    name="boss"
                    value="boss"
                    bind:group={activity.type}
                    type="radio"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="relationeel" class="font-medium text-gray-700"
                    >Eindbaas</label
                  >
                  <p class="text-gray-500">
                    Een eindbaas type ontgrendeld de locaties op de kaart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
        <label
          for="title"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Titel
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="title"
            name="title"
            rows="1"
            required
            bind:value={activity.title}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Beschrijving
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="description"
            name="description"
            rows="3"
            bind:value={activity.descriptionRaw}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
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
        </div>
      </div>
    </div>
  </div>

  <div
    class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="difficulty"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      Moeilijkheid
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <input
        id="difficulty"
        name="difficulty"
        type="number"
        min="1"
        max="5"
        bind:value={activity.difficulty}
        class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>
  <div
    class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="svg"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      SVG
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <textarea
        id="svg"
        name="svg"
        rows="5"
        bind:value={activity.svg}
        class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>

  <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Video</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Specificeer video gerelateerde informatie
      </p>
    </div>

    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label for="vimeo_id" class="block text-sm font-medium text-gray-700">
        Vimeo
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 flex rounded-md shadow-sm">
          <span
            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
          >
            https://vimeo.com/
          </span>
          <input
            type="number"
            name="vimeo_id"
            id="vimeo_id"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            bind:value={activity.video.vimeoId}
          />
        </div>
      </div>
    </div>
  </div>
  <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Quiz</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Specificeer vragen en quizjes
      </p>
    </div>
    <QuizForm bind:quizzes={activity.quizzes} showTimeInVideo={true} />
  </div>
</div>
