<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { getAlgoliaSearchClient, getGoalIndex } from "$lib/Internals/Algolia/algolia";
  import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
  import "@algolia/autocomplete-theme-classic";
  import VerwijderDialog from "$lib/Internals/Misc/dialog.svelte";

  export let locations = [];
  export let selectedIndex = 0;
  let deleteLocationToggle = false;
  let locationOptions;

  $: {
    for (let i = 0; i < locations.length; i++) {
      let newAccessLocations = [];
      for (let i2 = 0; i2 < locations[i].accessLocations.length; i2++) {
        let idFound = false;
        for (let i3 = 0; i3 < locations.length; i3++) {
          if (locations[i3].id === locations[i].accessLocations[i2]) {
            idFound = true;
          }
        }
        if (idFound) {
          newAccessLocations.push(locations[i].accessLocations[i2]);
        }
      }
      locations[i].accessLocations = newAccessLocations;
    }
  }

  $: {
    locationOptions = [];
    for (let i = 0; i < locations.length; i++) {
      if (i !== selectedIndex) {
        locationOptions.push({ id: locations[i].id, index: i + 1 });
      }
    }
  }

  $: {
    if (locations.length === 0) {
      addLocation();
    }
  }

  function deleteLocation() {
    locations.splice(selectedIndex, 1);
    locations = locations;
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
      for (let i = 0; i < locations.length; i++) {
        if (locations[i].id === randomString) {
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
    locations = [...locations, location];
  }
  onMount(() => {
  });

</script>

<VerwijderDialog bind:toggle={deleteLocationToggle} on:ok={deleteLocation} />
<div class="space-y-3 sm:space-y-2">
  <div>
    <div class="block tabs">
      <div class="border-b mb-3 border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {#each locations as location, i}
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

    <div>
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
            bind:value={locations[selectedIndex].name}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
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
            bind:value={locations[selectedIndex].textPositionX}
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
            bind:value={locations[selectedIndex].textPositionY}
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
            bind:value={locations[selectedIndex].markerPositionX}
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
            bind:value={locations[selectedIndex].markerPositionY}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mt-3">
          <input
            bind:checked={locations[selectedIndex].isStartLocation}
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
                bind:group={locations[selectedIndex].accessLocations}
                name="accessLocations"
                value={locationOption.id}
              />
              L{locationOption.index}
            </label>
          {/each}
        </div>
      </div>
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
