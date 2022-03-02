<script>
  import { onMount } from "svelte";
  import "@algolia/autocomplete-theme-classic";
  import VerwijderDialog from "$lib/Internals/Misc/dialog.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

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
  onMount(() => {});
</script>

<VerwijderDialog bind:toggle={deleteLocationToggle} on:ok={deleteLocation} />
<div class="space-y-3 sm:space-y-2">
  <div>
    <div class="block tabs">
      <div class="border-b mb-3 border-gray-200">
        <nav class="-mb-px flex space-x-8 items-center" aria-label="Tabs">
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
          <div>
            <Button
              on:click={addLocation}
              content="New Location"
              size="small"
            />
          </div>
        </nav>
      </div>
    </div>

    <div>
      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <label
          for="title"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {$t("name")}
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
          for="textPositionX"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {$t("text-position-x")}
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="textPositionX"
            name="title"
            rows="1"
            bind:value={locations[selectedIndex].textPositionX}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <label
          for="textPositionY"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {$t("text-position-y")}
        </label>

        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="textPositionY"
            name="title"
            rows="1"
            bind:value={locations[selectedIndex].textPositionY}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <label
          for="markerPositionX"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {$t("marker-position-x")}
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="markerPositionX"
            name="title"
            rows="1"
            bind:value={locations[selectedIndex].markerPositionX}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <label
          for="markerPositionY"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {$t("marker-position-y")}
        </label>

        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="markerPositionY"
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
            >{$t("start-location-on-the-map")}</label
          >
        </div>
        <label
          for="accessLocations"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {$t("access-to-locations")}
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

    <div class="flex justify-end">
      <Button
        dataTest="remove-location-button"
        on:click={() => removeLocationButtonFunction()}
        content={$t("remove-location")}
        size="small"
      />
    </div>
  </div>
</div>
