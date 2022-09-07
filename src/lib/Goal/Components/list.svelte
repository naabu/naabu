<script>
  import { onMount } from "svelte";
  import {
    getAlgoliaSearchClient,
    getGoalIndex,
  } from "$lib/Internals/Algolia/algolia";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
 import DOMPurify from 'dompurify';

  import { page } from "$app/stores"
  
  import { firebase } from "$lib/Internals/Firebase/store";
  import TimeAgo from "javascript-time-ago";
  import { formatToTimeAgo, truncate } from "$lib/Internals/Misc/helper";
  import { t, locale } from "svelte-intl-precompile";
  let truncateDescription = 600;

  let goalIndex;
  let goalIndexName = getGoalIndex($page.data.session.environment);

  let query = "";
  let hits = [];

  onMount(async () => {
    const searchClient = getAlgoliaSearchClient();
    goalIndex = searchClient.initIndex(goalIndexName);

    await search();
  });

  async function search() {
    const result = await goalIndex.search(query);
    hits = result.hits;
    for (let i = 0; i < hits.length; i++) {
      if (hits[i].description) {
        hits[i].description = truncate(
          hits[i].description,
          truncateDescription
        );
        hits[i].description = hits[i].description.replace(
          /(?:\r\n|\r|\n)/g,
          "<br>"
        );
      }
    }
  }

  TimeAgo.addLocale(en);
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo($locale);
</script>

<slot name="link" />
<div>
  <div class="relative flex items-center justify-center mt-4 mb-4">
    <div class="w-full sm:max-w-xs">
      <label for="search" class="sr-only">{$t("search")}</label>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          id="search"
          name="search"
          class="pr-3 block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={$t("search")}
          type="search"
          bind:value={query}
          on:keyup={search}
          on:search={search}
        />
      </div>
    </div>
  </div>
</div>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("goal")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("number-of-models")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("number-of-activities")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("number-of-assessments")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("last-change-on")}
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">{$t("edit")}</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each hits as hit, i}
              <tr>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {hit.title}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {#if hit.numberOfModels}
                    {hit.numberOfModels}
                   {:else}
                     0
                   {/if}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {#if hit.numberOfActivities}
                     {hit.numberOfActivities}
                    {:else}
                      0
                    {/if}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {#if hit.numberOfAssessments}
                     {hit.numberOfAssessments}
                    {:else}
                      0
                    {/if}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {#if hit.modifiedAt}
                      {formatToTimeAgo(hit.modifiedAt, $firebase, timeAgo, $t)}
                    {:else}
                      --
                    {/if}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="/leerdoel/{hit.objectID}"
                    class="text-indigo-600 hover:text-indigo-900"
                    >{$t("show")}</a
                  >
                  <slot
                    name="cta-learning-goal"
                    goalId={hit.objectID}
                    goalTitle={hit.title}
                    index={i}
                  >
                    <a
                      href="/leerdoel/{hit.objectID}/wijzigen"
                      class="text-indigo-600 hover:text-indigo-900"
                      >{$t("edit")}</a
                    >
                  </slot>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if hits.length === 0}
          <div class="m-4">
            {$t("goals-not-found")}
            <a class="underline" href="/leerdoel/maken">
              {$t("create-goal-message")}
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  :global(em) {
    color: red;
    font-weight: bold;
    background: black;
  }
</style>
