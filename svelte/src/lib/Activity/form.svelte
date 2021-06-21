<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { getAlgoliaSearchClient, getGoalIndex } from "$lib/algolia";
  import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
  import "@algolia/autocomplete-theme-classic";
  import { renderKatexOutput } from "./helper.js";
  import QuizForm from "$lib/Quizzes/form.svelte";

  export let activity;

  let filters = "";
  let goalIndex = getGoalIndex($session.environment);

  function updatePreview() {
    activity.description = renderKatexOutput(activity.descriptionRaw);
  }

  function resetFilters() {
    let objectIDsFilter = activity.goals.map(
      (leerdoel) => "NOT objectID:" + leerdoel.objectID
    );
    filters = objectIDsFilter.join(" AND ");
  }

  function addLeerdoel(leerdoel) {
    activity.goals = [...activity.goals, leerdoel];
    resetFilters();
  }

  function removeLeerdoel(i) {
    activity.goals.splice(i, 1);
    activity.goals = activity.goals;
    resetFilters();
  }

  onMount(() => {
    runAutocomplete();
  });

  function runAutocomplete() {
    const searchClient = getAlgoliaSearchClient();
    autocomplete({
      container: "#autocomplete-leerdoelen",
      placeholder: "Zoek voor leerdoelen",
      onSubmit({ state }) {
        console.log(state);
      },
      getSources({ query }) {
        return [
          {
            sourceId: goalIndex,
            onSelect({ state, item }) {
              addLeerdoel(item);
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: goalIndex,
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                    filters: filters,
                  },
                ],
              });
            },
            templates: {
              item({ item }) {
                return item.title;
              },
              noResults() {
                return "Geen leerdoelen gevonden";
              },
            },
            // ...
          },
        ];
      },
    });
  }
</script>

<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
  <div>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
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
          <button
            class="preview-button mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={updatePreview}>Update preview</button
          >
          {#if activity.description}
            {@html activity.description}
          {/if}
        </div>
      </div>
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="type"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Type
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="type"
            name="type"
            rows="1"
            bind:value={activity.type}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="difficulty"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Difficulty
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
    </div>
  </div>

  <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Leerdoelen</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Met welke leerdoelen heeft deze activeit te maken?
    </p>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="title"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Gekoppelde leerdoelen
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          {#if activity.goals.length === 0}
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Nog geen leerdoelen aan activiteit toegevoegd
            </p>
          {:else}
            <ul>
              {#each activity.goals as leerdoel, i}
                <li>
                  {leerdoel.title}
                  <button
                    class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    on:click|preventDefault={() => removeLeerdoel(i)}
                    >Weghalen</button
                  >
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>

    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="autocomplete-leerdoelen"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Leerdoel toevoegen
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div id="autocomplete-leerdoelen" class="max-w-lg" />
        </div>
      </div>
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

  <QuizForm bind:quizzes={activity.quizzes} showTimeInVideo={true}/>
</div>

<style>
  .preview-button {
    display: block;
    margin-bottom: 10px;
  }
</style>
