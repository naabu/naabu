<script>
  import { onMount } from "svelte";
  import ManagementTabs from "$lib/Internals/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import {
    getAlgoliaSearchClient,
    getMapIndex,
  } from "$lib/Internals/Algolia/algolia";
  
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";

  let index;
  let indexName = getMapIndex($page.data.session.environment);

  let query = "";
  let hits = [];

  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
    },
    {
      url: "/beheer/kaart",
      value: $t("maps"),
    },
  ];

  onMount(async () => {
    const searchClient = getAlgoliaSearchClient();
    index = searchClient.initIndex(indexName);
    await search();
  });

  async function search() {
    const result = await index.search(query);
    hits = result.hits;
  }
</script>

<ShowBreadcrumb bind:breadcrumbs />
<ManagementTabs mainSelected="map" />

<a href="kaart/maken">{$t("create-new-map")}</a>

<div>
  <TextInput bind:value={query} on:keyup={search} />
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
                {$t("title")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("image")}
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">{$t("edit")}</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each hits as hit}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {hit.title}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="description text-sm text-gray-900">
                    {hit.image}}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="/kaart/{hit.objectID}"
                    class="text-indigo-600 hover:text-indigo-900"
                    >{$t("show")}</a
                  >
                  <a
                    href="/beheer/kaart/{hit.objectID}/wijzigen"
                    class="text-indigo-600 hover:text-indigo-900"
                    >{$t("edit")}</a
                  >
                  <a
                    href="/beheer/kaart/{hit.objectID}/paden"
                    class="text-indigo-600 hover:text-indigo-900"
                    >{$t("paths")}</a
                  >
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
