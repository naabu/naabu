<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import Form from "$lib/Module/Map/Components/pathForm.svelte";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { getMapSaveData } from "$lib/Module/Map/Components/helper";
  import Button from "$lib/Internals/Button/Button.svelte";

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
      url: "/beheer/kaart/" + $page.params.id + "/paden",
      value: "Paden wijzigen",
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
    let data = getMapSaveData(map);
    alert = getDefaultAlertValues();
    try {
      await ref.update(data);
      alert.success = true;
      alert.successTitle = "Paden op kaart gewijzigd";
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
            <Button isSubmit={true} color="primary" content="Paden wijzigen" />
          </div>
        </div>
      </div>
    </form>
  </div>
{/if}
