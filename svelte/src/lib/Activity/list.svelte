<script>
  import { onMount } from 'svelte';
  import { getAlgoliaSearchClient, getGoalIndex, getActivityIndex } from "$lib/algolia";
  import { getStores } from "$app/stores"
  const { session, page } = getStores();
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import ManagementTabs from "$lib/Tabs/management.svelte";

  let index;
  let indexName = getActivityIndex($session.environment);
  let truncateDescription = 200;
  
  let query = '';
  let hits = [];

  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    },
    {
      url: '/beheer/activiteit',
      value: 'Activiteit'
    }
  ];

  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

  onMount(async() => {
    const searchClient = getAlgoliaSearchClient();
    index = searchClient.initIndex(indexName);   
    await search();
  });
  
  async function search() {
    const result = await index.search(query);
    hits = result.hits;
    for(let i = 0; i < hits.length; i++) {
      hits[i].description = truncate(hits[i].description, truncateDescription);
    }
  
  }
  
  
</script>
  
<style>
    :global(em) {
        color: red;
        font-weight: bold;
        background: black;
    }
</style>

<ShowBreadcrumb bind:breadcrumbs />
<ManagementTabs selected="activity" />

<a href="activiteit/maken"> Nieuwe activiteit maken</a>

<div>
    <input type="text" bind:value={query} on:keyup={search}>
</div>
  
<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titel
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Beschrijving
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aantal quizjes
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test vraag
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
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
                    <div class="description text-sm text-gray-900"> {#if hit.description}{@html hit.description}{:else}Geen beschrijving{/if}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900"> {#if hit.quizes}{hit.quizes.length}{:else}Geen quizjes gevonden{/if}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="/beheer/activiteit/{hit.objectID}" class="text-indigo-600 hover:text-indigo-900">Bekijken</a>
                      <a href="/beheer/activiteit/{hit.objectID}/wijzigen" class="text-indigo-600 hover:text-indigo-900">Wijzigen</a>
                  </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>