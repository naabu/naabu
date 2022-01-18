<script>
  import "@algolia/autocomplete-theme-classic";
  import LocationForm from "$lib/Module/Components/locationForm.svelte";
  import { formatMapObject } from "$lib/Module/Components/helper";
  export let module;
  export let allMaps;

  function changeMap() {
    module = formatMapObject(module, true, false);
  }
</script>

<div class="mb-44 space-y-8 divide-y divide-gray-200 sm:space-y-5">
  <div>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Naam
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="name"
            name="name"
            required
            rows="1"
            bind:value={module.moduleName}
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
            bind:value={module.moduleDescription}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
          <p class="mt-2 text-sm text-gray-500">Beschrijf kort de lesmodule.</p>
        </div>
      </div>
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="svg"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          SVG afbeelding
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="svg"
            name="svg"
            rows="5"
            bind:value={module.moduleSvg}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
        <label
          for="maps"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Kaart
        </label>
        <select
          id="maps"
          name="maps"
          class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          bind:value={module.map}
          on:change={changeMap}
        >
          <option value={undefined}>Geen kaart</option>
          {#each allMaps as map}
            <option class:selected={module.map === map} value={map}>{map.title}</option>
          {/each}
        </select>
      </div>
      {#if module.locations}
        <div
          class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5"
        >
          <h3 class="text-lg leading-6 font-medium text-gray-900">Locaties</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Locaties op de kaart?
          </p>
          <LocationForm bind:map={module} />
        </div>
      {/if}
    </div>
  </div>
</div>
