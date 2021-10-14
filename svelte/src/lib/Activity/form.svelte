<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import "@algolia/autocomplete-theme-classic";
  import { renderKatexOutput } from "$lib/Misc/helper.js";
  import QuizForm from "$lib/Quizzes/form.svelte";

  export let activity;

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
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">Quiz</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Specificeer vragen en quizjes
    </p>
  </div>
  <QuizForm bind:quizzes={activity.quizzes} showTimeInVideo={true} />
</div>

<style>
  .preview-button {
    display: block;
    margin-bottom: 10px;
  }
</style>
