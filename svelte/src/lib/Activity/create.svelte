<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { session } from "$app/stores";
  import {onMount} from 'svelte';
  import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
  import algoliasearch from 'algoliasearch';
  import '@algolia/autocomplete-theme-classic';
  let title = "";
  let selectedLeerdoelen = [];
  let filters = "";

  $: console.log(selectedLeerdoelen);


  function resetFilters() {
    let objectIDsFilter = selectedLeerdoelen.map(leerdoel => "NOT objectID:" + leerdoel.objectID);
    filters = objectIDsFilter.join(' AND ');
  }

  function addLeerdoel(leerdoel) {
    selectedLeerdoelen = [... selectedLeerdoelen, leerdoel];
    resetFilters();
  }

  function removeLeerdoel(i) {
    selectedLeerdoelen.splice(i, 1);
    selectedLeerdoelen = selectedLeerdoelen;
    resetFilters();
  }

  onMount(() => {
    const searchClient = algoliasearch(
      '6868GHOPYM',
      '91b10504939fb851e4fab041ddd92618'
    );
    autocomplete({
      container: '#autocomplete-leerdoelen',
      placeholder: 'Zoek voor leerdoelen',
      onSubmit({state}) {
        console.log(state);
      },
      getSources({ query }) {
        return [
          {
            sourceId: 'goals',
            onSelect({ state, item }) {
              addLeerdoel(item);
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'dev_goals',
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                    filters: filters,
                  },
                ],
              })
            },
            templates: {
              item({ item }) {
                return item.title;
              },
              noResults() {
                return 'Geen leerdoelen gevonden';
              },
            },
            // ...
          },
        ];
      },
    });
  })

  async function createActivity() {
    const db = await getFirebaseFirestore($session.environment);
    let addLeerdoelen = [];
    for (let i = 0; i < selectedLeerdoelen.length; i++) {
      let toAdd = {};
      toAdd.objectID = selectedLeerdoelen[i].objectID;
      toAdd.taxonomy_solo = selectedLeerdoelen[i].taxonomy_solo;
      toAdd.taxonomy_bloom = selectedLeerdoelen[i].taxonomy_bloom;
      addLeerdoelen = [... addLeerdoelen, toAdd]
    }
    const data = {
      title: title,
      leerdoelen: addLeerdoelen,
    };
    try {
      await addDoc(collection(db, "activities"), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function formSubmit(event) {
    await createActivity();
  }


</script>

<div>

  <div>
    <nav class="sm:hidden" aria-label="Back">
      <a
        href="/beheer/activiteit"
        class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
      >
        <!-- Heroicon name: solid/chevron-left -->
        <svg
          class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Back
      </a>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <a
                href="/beheer"
                class="text-sm font-medium text-gray-400 hover:text-gray-200"
                >Beheer</a
              >
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="/beheer/activiteit"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Activiteit</a
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="#"
              aria-current="page"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Activiteit maken</a
            >
          </div>
        </li>
      </ol>
    </nav>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Activiteit maken</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Maak hier elke soort activiteit, bijvoorbeeld een uitleg video of quiz.
          </p>
        </div>
      </div>

    </div>
  </div>
  <form class="space-y-8 divide-y divide-gray-200" on:submit|preventDefault={formSubmit}>
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
                rows="2"
                bind:value={title}
                class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <p class="mt-2 text-sm text-gray-500">
                Beschrijf kort de activiteit
              </p>
            </div>
          </div>
        </div>
      </div>
    
      <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Leerdoelen
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Met welke leerdoelen heeft deze activeit te maken?
          </p>
          


        <div>
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
                {#if selectedLeerdoelen.length === 0 }
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Nog geen leerdoelen aan activiteit toegevoegd
                </p>
                {:else}
                <ul>
                  {#each selectedLeerdoelen as leerdoel , i}
                    <li>{leerdoel.title} <button on:click|preventDefault={() => removeLeerdoel(i)}>Weghalen</button></li>
                  {/each}
                </ul>
                {/if}
              </div>
            </div>
          </div>

        <div>
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
                <div id="autocomplete-leerdoelen" class="max-w-lg"></div>
              </div>
            </div>
          </div>


  
      </div>
    </div>

      <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5" >
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Video
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Specificeer video gerelateerde dingen
          </p>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Activiteit aanmaken
        </button>
      </div>
    </div>
  </form>

  
</div>
