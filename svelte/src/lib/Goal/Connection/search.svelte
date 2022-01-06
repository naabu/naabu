<script>
  import { onMount } from "svelte";
  import { getAlgoliaSearchClient, getGoalIndex } from "$lib/Internals/algolia";
  import { getStores, session } from "$app/stores";
  import { truncate } from "$lib/Internals/Misc/helper";
  export let goal;
  export let firebase;
  export let listLinkedGoalIds;

  let truncateDescription = 600;

  let goalIndex;
  let goalIndexName = getGoalIndex($session.environment);

  // List of all linked goal ids.

  let filters;

  $: if (listLinkedGoalIds) {
    filters = resetFilters();
  }

  function resetFilters() {
    let objectIDsFilter = listLinkedGoalIds.map(
      (leerdoelId) => "NOT objectID:" + leerdoelId
    );
    return objectIDsFilter.join(" AND ");
  }

  let query = "";
  let hits = [];

  onMount(async () => {
    const searchClient = getAlgoliaSearchClient();
    goalIndex = searchClient.initIndex(goalIndexName);
    await search();
  });

  async function search() {
    const result = await goalIndex.search(query, {
      filters: filters,
    });
    hits = result.hits;
    for (let i = 0; i < hits.length; i++) {
      hits[i].description = truncate(hits[i].description, truncateDescription);
      hits[i].description = hits[i].description.replace(
        /(?:\r\n|\r|\n)/g,
        "<br>"
      );
    }
  }
</script>

<div>
  <div class="relative flex items-center justify-center mt-4 mb-4">
    <div class="w-full sm:max-w-xs">
      <label for="search" class="sr-only">Search</label>
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
          placeholder="Search"
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
                Leerdoel
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Beschrijving
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Activiteiten
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each hits as hit}
              {#if hit.objectID !== goal.id}
                <tr>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {hit.title}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {#if hit.description}{@html hit.description}{:else}Geen
                        beschrijving{/if}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {#if hit.activities}Activiteiten{:else}Geen activititen{/if}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/leerdoel/{hit.objectID}"
                      class="text-indigo-600 hover:text-indigo-900">Bekijken</a
                    >
                    <a
                      href="/leerdoel/{goal.id}/verbinding-maken/{hit.objectID}"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Verbinding maken</a
                    >
                  </td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
