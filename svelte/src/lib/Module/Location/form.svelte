<script>
  import { getStores, session, page } from "$app/stores";
  import PathsForm from "$lib/Module/Location/pathsForm.svelte";
  import { onMount } from "svelte";
  import { getAlgoliaSearchClient, getGoalIndex } from "$lib/algolia";
  import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
  import "@algolia/autocomplete-theme-classic";
  import VerwijderDialog from "$lib/Misc/dialog.svelte";
import { generatePathsForMap } from "$lib/Map/helper";

  let filters = "";
  let goalIndex = getGoalIndex($session.environment);

  export let map;

  $:console.log(map);

  $: if (map) {
    generatePathsForMap(map);
  }

  export let selectedIndex = 0;
  let deleteLocationToggle = false;
  let locationOptions;
  let selectedLocationTab = "content";
  let autoCompleteElementExists = null;
  let autoCompleteTimer;

  $: {
    for (let i = 0; i < map.locations.length; i++) {
      let newAccessLocations = [];
      for (let i2 = 0; i2 < map.locations[i].accessLocations.length; i2++) {
        let idFound = false;
        for (let i3 = 0; i3 < map.locations.length; i3++) {
          if (map.locations[i3].id === map.locations[i].accessLocations[i2]) {
            idFound = true;
          }
        }
        if (idFound) {
          newAccessLocations.push(map.locations[i].accessLocations[i2]);
        }
      }
      map.locations[i].accessLocations = newAccessLocations;
    }
  }

  $: {
    locationOptions = [];
    for (let i = 0; i < map.locations.length; i++) {
      if (i !== selectedIndex) {
        locationOptions.push({ id: map.locations[i].id, index: i + 1 });
      }
    }
  }

  $: {
    if (selectedIndex >= 0 && map.locations.length > 0) {
      resetFilters();
    }
  }

  $: {
    if (map.locations.length === 0) {
      addLocation();
    }
  }

  function deleteLocation() {
    map.locations.splice(selectedIndex, 1);
    map.locations = map.locations;
    selectedIndex = 0;
  }

  function setselectedIndex(index) {
    selectedIndex = index;
  }

  function removeLocationButtonFunction() {
    deleteLocationToggle = true;
  }

  function addLocation() {
    let randomString = "";
    let uniqueString = false;
    while (!uniqueString) {
      randomString = Math.random().toString(36).substring(2, 7);
      uniqueString = true;
      for (let i = 0; i < map.locations.length; i++) {
        if (map.locations[i].id === randomString) {
          uniqueString = false;
        }
      }
      if (randomString.length < 5) {
        uniqueString = false;
      }
    }

    let location = {
      id: randomString,
      isStartLocation: false,
      accessLocations: [],
      name: "",
      textPositionX: "",
      textPositionY: "",
      markerPositionX: "",
      markerPositionY: "",
      goals: [],
    };
    map.locations = [...map.locations, location];
    resetFilters();
  }

  function resetFilters() {
    let objectIDsFilter = map.locations[selectedIndex].goals.map(
      (leerdoel) => "NOT objectID:" + leerdoel.objectID
    );
    filters = objectIDsFilter.join(" AND ");
  }

  function addGoal(goal) {
    map.locations[selectedIndex].goals = [...map.locations[selectedIndex].goals, goal];
    resetFilters();
  }

  function removeGoal(i) {
    map.locations[selectedIndex].goals.splice(i, 1);
    map.locations[selectedIndex].goals = map.locations[selectedIndex].goals;
    resetFilters();
  }

  onMount(() => {
    // runAutocomplete();
  });

  $: if (selectedLocationTab === "content") {
    autoCompleteTimer = setInterval(() => {
      // console.log("timer running");
      autoCompleteElementExists = document.getElementById(
        "autocomplete-leerdoelen"
      );
      // console.log(autoCompleteElementExists);
    }, 100);
  }

  $: if (autoCompleteElementExists !== null && autoCompleteTimer) {
    clearInterval(autoCompleteTimer);
    console.log(autoCompleteTimer);
    runAutocomplete();
  }

  function runAutocomplete() {
    if (map.locations.length > 0) {
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
                addGoal(item);
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
            },
          ];
        },
      });
    }
  }

  function setSelectedLocationTab(tab) {
    selectedLocationTab = tab;
    autoCompleteElementExists = null;
  }
</script>

<VerwijderDialog bind:toggle={deleteLocationToggle} on:ok={deleteLocation} />
<div class="space-y-3 sm:space-y-2">
  <div>
    <div class="block tabs">
      <div class="border-bborder-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {#each map.locations as location, i}
            {#if selectedIndex !== i}
              <button
                on:click|preventDefault={() => setselectedIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                L{i + 1}
              </button>
            {:else}
              <button
                on:click|preventDefault={() => setselectedIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                L{i + 1}
              </button>
            {/if}
          {/each}
          <button
            class="mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={addLocation}
          >
            New Location
          </button>
        </nav>
      </div>
    </div>
    <div class="block tabs">
      <div class="border-b mb-3 border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {#if selectedLocationTab !== "content"}
            <button
              on:click|preventDefault={() => setSelectedLocationTab("content")}
              class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Inhoud
            </button>
          {:else}
            <button
              on:click|preventDefault={() => setSelectedLocationTab("content")}
              class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Inhoud
            </button>
          {/if}
          {#if selectedLocationTab !== "waypoints"}
            <button
              on:click|preventDefault={() =>
                setSelectedLocationTab("waypoints")}
              class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Waypoints
            </button>
          {:else}
            <button
              on:click|preventDefault={() =>
                setSelectedLocationTab("waypoints")}
              class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Waypoints
            </button>
          {/if}
          {#if selectedLocationTab !== "paths"}
            <button
              on:click|preventDefault={() => setSelectedLocationTab("paths")}
              class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Paden
            </button>
          {:else}
            <button
              on:click|preventDefault={() => setSelectedLocationTab("paths")}
              class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Paden
            </button>
          {/if}
        </nav>
      </div>
    </div>

    <div>
      {#if selectedLocationTab === "content"}
        <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Name
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="title"
              name="title"
              rows="1"
              bind:value={map.locations[selectedIndex].name}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>

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
                {#if map.locations[selectedIndex].goals.length === 0}
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Nog geen leerdoelen aan activiteit toegevoegd
                  </p>
                {:else}
                  <ul>
                    {#each map.locations[selectedIndex].goals as goal, i}
                      <li>
                        {goal.title}
                        <button
                          class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          on:click|preventDefault={() => removeGoal(i)}
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
      {:else if selectedLocationTab === "waypoints"}
        <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
          <label
            for="positionX"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            tekst position X
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="positionX"
              name="title"
              rows="1"
              bind:value={map.locations[selectedIndex].textPositionX}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <label
            for="positionX"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            tekst position Y
          </label>

          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="positionX"
              name="title"
              rows="1"
              bind:value={map.locations[selectedIndex].textPositionY}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <label
            for="positionX"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            marker position X
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="positionX"
              name="title"
              rows="1"
              bind:value={map.locations[selectedIndex].markerPositionX}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <label
            for="positionX"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            marker position Y
          </label>

          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="positionX"
              name="title"
              rows="1"
              bind:value={map.locations[selectedIndex].markerPositionY}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div class="mt-3">
            <input
              bind:checked={map.locations[selectedIndex].isStartLocation}
              id="answers_check"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label class="font-medium text-gray-700" for="answers_check"
              >Start locatie op kaart</label
            >
          </div>
          <label
            for="accessLocations"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Toegang tot locaties
          </label>

          <div class="mt-1 sm:mt-0 sm:col-span-2">
            {#each locationOptions as locationOption}
              <label>
                <input
                  type="checkbox"
                  bind:group={map.locations[selectedIndex].accessLocations}
                  name="accessLocations"
                  value={locationOption.id}
                />
                L{locationOption.index}
              </label>
            {/each}
          </div>
        </div>
      {:else if selectedLocationTab === "paths"}
        <PathsForm bind:map bind:selectedIndex />
      {/if}
    </div>
    <button
      type="button"
      on:click|preventDefault={() => removeLocationButtonFunction()}
      class="float-right mt-3 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Locatie verwijderen</button
    >
  </div>
</div>
