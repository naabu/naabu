<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";

  export let map;

  export let selectedIndex;
  let paths = [];

  let selectedPathIndex;
  let selectedPath = null;
  let newPointX = 0;
  let newPointY = 0;

  function removePoint(index) {
    selectedPath.points.splice(index, 1);
    selectedPath.points = selectedPath.points;
  }

  function addPoint() {
    let newPointArray = [];
    let newPoint = ["" + newPointY, "" + newPointX];
    for (let i = 0; i < selectedPath.points.length; i++) {
      if (i === selectedPath.points.length - 1) {
        newPointArray.push(newPoint);
      }
      newPointArray.push(selectedPath.points[i]);
    }
    selectedPath.points = newPointArray;
    map.paths = paths;
  }

  function setselectedPathIndex(index) {
    selectedPathIndex = index;
  }

  $: if (selectedPathIndex >= 0) {
    selectedPath = null;
    if (paths.length > selectedPathIndex) {
      selectedPath = paths[selectedPathIndex];
    }
  }

  $: if (selectedIndex >= 0) {
    paths = [];
    for (let i = 0; i < map.paths.length; i++) {
      if (map.paths[i].startLocation === map.locations[selectedIndex].id) {
        paths.push(map.paths[i]);
      }
    }
    setselectedPathIndex(0);
  }
</script>

<div class="block tabs">
  <div class="border-b mb-3 border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      {#each paths as path, i}
        {#if selectedPathIndex !== i}
          <button
            data-test="path-to-location-button-{path.endLocationIndex + 1}"
            on:click|preventDefault={() => setselectedPathIndex(i)}
            class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            L{path.endLocationIndex + 1}
          </button>
        {:else}
          <button
            data-test="path-to-location-button-{path.endLocationIndex + 1}"
            on:click|preventDefault={() => setselectedPathIndex(i)}
            class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            L{path.endLocationIndex + 1} - {path.endLocationName}
          </button>
        {/if}
      {/each}
      {#if paths.length === 0}
        <div class="mt-6 mb-6">{$t("no-paths-found-for-start-location")}</div>
      {/if}
    </nav>
  </div>
</div>

{#if selectedPath}
  {#each selectedPath.points as point, i}
    {#if i == 0}
      <div data-test="start-location-point">
        {$t("start-location")}: {point[1]} - {point[0]}
      </div>
    {:else if i == selectedPath.points.length - 1}
      <div data-test="end-location-point">
        {$t("end-location")}: {point[1]} - {point[0]}
      </div>
    {:else}
      <div>
        <TextInput
          title={$t("point-x")}
          dataTest="path-input-x-{i}"
          bind:value={point[1]}
        />

        <TextInput
          title={$t("point-y")}
          dataTest="path-input-y-{i}"
          bind:value={point[0]}
        />

        <Button
          dataTest="remove-path-point-button-{i}"
          on:click={() => removePoint(i)}
          content={$t("remove")}
          size="small"
        />
      </div>
    {/if}
  {/each}

  <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
    <label
      for="pointX"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      X
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <input
        type="number"
        id="pointX"
        name="pointX"
        bind:value={newPointX}
        class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
    <label
      for="pointY"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      Y
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <input
        type="number"
        id="pointY"
        name="pointY"
        bind:value={newPointY}
        class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      />

      <div class="flex justify-end max-w-lg mt-3">
        <Button
          dataTest="add-path-point-button"
          size="small"
          content={$t("add-point-button")}
          on:click={addPoint}
        />
      </div>
    </div>
  </div>
{/if}
