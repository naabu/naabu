<script>
  import "@algolia/autocomplete-theme-classic";
  import LocationForm from "$lib/Module/Map/Location/form.svelte";
  export let map;

  function getPath(startLocation, endLocation) {
    for (let i = 0; i < map.paths.length; i++) {
      if (map.paths[i].startLocation === startLocation && map.paths[i].endLocation === endLocation)
      {
        return map.paths[i];
      }
    }
    return false;
  }


  $: {
    let newPaths = [];
    for (let i = 0; i < map.locations.length; i++) {
      let location = map.locations[i];
      let startPointX = location.markerPositionX;
      let startPointY = location.markerPositionY;
      for (let i2 = 0; i2 < location.accessLocations.length; i2++) {
        for (let i3 = 0; i3 < map.locations.length; i3++) {
          if ( map.locations[i3].id === location.accessLocations[i2]) {
            let endPointX = map.locations[i3].markerPositionX;
            let endPointY = map.locations[i3].markerPositionY;
            
            // Check if there is an existing path for these locations.
            let pointsArray = [[startPointY, startPointX], [endPointY, endPointX]];
            let path = getPath(location.id, map.locations[i3].id);
            if (path) {
              path.points[0] = [startPointY, startPointX];
              path.points[path.points.length-1] = [endPointY, endPointX]
              pointsArray = path.points;
            }
            newPaths.push({startLocation: location.id, startLocationName: location.name, endLocation: map.locations[i3].id, endLocationName: map.locations[i3].name, endLocationIndex: i3, points: pointsArray});
          }
        }
      }
    }
    map.paths = newPaths;
  }

  let mapImageOptions = [
    {
      name: "Fantasy",
      url:
        "https://firebasestorage.googleapis.com/v0/b/expwis.appspot.com/o/map1.png?alt=media&token=12e1ee07-a782-40c1-addc-e2179fc89d95",
    },
    {
      name: "Fantasy2",
      url:
        "https://firebasestorage.googleapis.com/v0/b/expwis.appspot.com/o/map1.png?alt=media&token=12e1ee07-a782-40c1-addc-e2179fc8123",
    },
  ];
</script>

<div class="mb-44 space-y-8 divide-y divide-gray-200 sm:space-y-5">
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
            rows="1"
            bind:value={map.title}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="mapimage"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Kaart afbeelding
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <select id="mapimage" bind:value={map.image}>
            {#each mapImageOptions as mapImageOption}
              <option value={mapImageOption.url}>{mapImageOption.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Locaties</h3>
  <p class="mt-1 max-w-2xl text-sm text-gray-500">
    Welke locaties wil je op de kaart zetten?
  </p>

  
  <LocationForm bind:locations={map.locations}/>
</div>
<!-- <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
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
      {#if locations[selectedIndex].goals.length === 0}
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Nog geen leerdoelen aan activiteit toegevoegd
        </p>
      {:else}
        <ul>
          {#each locations[selectedIndex].goals as goal, i}
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
  </div>
</div> -->