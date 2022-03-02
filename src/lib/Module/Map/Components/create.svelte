<script>
  import MapForm from "$lib/Module/Map/Components/form.svelte";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { onMount } from "svelte";
  import { getMapSaveData } from "$lib/Module/Map/Components/helper";
  import { getStores, session } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  export let firebase;

  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
    },
    {
      url: "/beheer/kaart",
      value: $t("maps"),
    },
    {
      url: "/beheer/kaarten/maken",
      value: $t("create-maps"),
    },
  ];

  let y;
  let db;
  let map = {
    title: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/expwis.appspot.com/o/map1.png?alt=media&token=12e1ee07-a782-40c1-addc-e2179fc89d95",
    locations: [],
    paths: [],
  };
  let buttonDisabled = false;

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  let alert = getDefaultAlertValues();

  onMount(async () => {
    db = await firebase.firestore();
  });

  async function createMap() {
    let data = getMapSaveData(map);
    data.authorId = $session.user.uid;
    alert = getDefaultAlertValues();
    try {
      let collectionRef = db.collection("maps");
      let result = await collectionRef.add(data);
      alert.success = true;
      alert.successTitle = $t("map-created");
      alert.successMessage = "id: " + result.id;
      map.id = result.id;
      updateActivities(firebase, map);
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
  }

  async function formSubmit() {
    buttonDisabled = true;
    await createMap();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<svelte:window bind:scrollY={y} />

<ShowBreadcrumb bind:breadcrumbs />
<ResultFeedback bind:alert />

<div>
  <div class="mt-2 md:flex md:items-center md:justify-between">
    <div class="flex-1 min-w-0">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {$t("create-map")}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {$t("create-map-description")}
        </p>
      </div>
    </div>
  </div>
</div>
<form
  class="space-y-8 divide-y divide-gray-200"
  on:submit|preventDefault={formSubmit}
>
  <MapForm bind:map />

  <div class="pt-5">
    <div class="flex justify-end">
      <Button
        isDisabled={buttonDisabled}
        isSubmit={true}
        color="primary"
        content={$t("create-map")}
      />
    </div>
  </div>
</form>
