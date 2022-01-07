<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import Form from "$lib/Module/Map/Components/form.svelte";
  import ShowBreadcrumb from "$lib/Goal/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { getMapSaveData, updateActivities } from "$lib/Module/Map/Components/helper";

  let y;
  export let ref;
  export let firebase;
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
      map.id = snap.id;
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
    let data = getMapSaveData(map);
    data.authorId = $session.user.uid;
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
