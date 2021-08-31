<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import Form from "./form.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";

  let y;
  export let ref;
  let snap;
  let map;

  let breadcrumbs = [
    {
      url: "/beheer",
      value: "Beheer",
    },
    {
      url: "/beheer/kaart",
      value: "Kaarten",
    },
    {
      url: "/beheer/kaart/" + $page.params.id + "/wijzigen",
      value: "Kaart wijzigen",
    },
  ];

  let alert = getDefaultAlertValues();

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  onMount(async () => {
    snap = await ref.get();
    if (snap.exists) {
      map = snap.data();
      for (let i = 0; i < map.locations.length; i++) {
        if (!map.locations[i].goals) {
          map.locations[i].goals = [];
        }
      }
      for (let i = 0; i < map.paths.length; i++) {
        let addPath = map.paths[i];
        addPath.points = JSON.parse(addPath.points);
      }
    }
  });

  async function edit() {
    let saveLocations = [];
    for (let i = 0; i < map.locations.length; i++) {
      let newLocation = {
        id: map.locations[i].id,
        isStartLocation: map.locations[i].isStartLocation,
        accessLocations: map.locations[i].accessLocations,
        name: map.locations[i].name,
        textPositionX: map.locations[i].textPositionX,
        textPositionY: map.locations[i].textPositionY,
        markerPositionX: map.locations[i].markerPositionX,
        markerPositionY: map.locations[i].markerPositionY,
      };
      let saveGoals = [];
      for (let i2 = 0; i2 < map.locations[i].goals.length; i2++) {
        let goalData = {
          title: map.locations[i].goals[i2].title,
        };
        if (map.locations[i].goals[i2].objectID) {
          goalData.id = map.locations[i].goals[i2].objectID;
        } else {
          goalData.id = map.locations[i].goals[i2].id;
        }
      }
      newLocation.goals = saveGoals;
      saveLocations.push(newLocation);
    }

    let savedPath = [];
    for (let i = 0; i < map.paths.length; i++) {
      let newPath = {};
      newPath.startLocation = map.paths[i].startLocation;
      newPath.endLocation = map.paths[i].endLocation;
      newPath.points = JSON.stringify(map.paths[i].points);
      newPath.startLocationName = map.paths[i].startLocationName;
      newPath.endLocationName = map.paths[i].endLocationName;
      newPath.endLocationIndex = map.paths[i].endLocationIndex;
      savedPath.push(newPath);
    }

    const data = {
      title: map.title,
      image: map.image,
      locations: saveLocations,
      paths: savedPath,
    };
    alert = getDefaultAlertValues();
    try {
      await ref.update(data);
      alert.success = true;
      alert.successTitle = "Kaart gewijzigd";
      alert.successMessage = "id: " + ref.id;
    } catch (e) {
      console.error("Error adding documfent: ", e);
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
  }

  async function formSubmit(event) {
    await edit();
  }
</script>

<svelte:window bind:scrollY={y} />

{#if map}
  <div>
    <ShowBreadcrumb bind:breadcrumbs />
    <ResultFeedback bind:alert />
    <div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Kaart wijzigen
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Wijzig hier je kaart
            </p>
          </div>
        </div>
      </div>
    </div>
    <form
      class="space-y-8 divide-y divide-gray-200"
      on:submit|preventDefault={formSubmit}
    >
      <Form bind:map />

      <div class="">
        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="submit"
              class="float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kaart wijzigen
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
{/if}
