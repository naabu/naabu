<script>
  import ModuleForm from "$lib/Module/Components/form.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { onMount } from "svelte";
  import { getDefaultAlertValues } from "$lib/Internals/Misc/helper";
  import { formatMapObject } from "$lib/Module/Components/helper";
  
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";

  let y;
  let db;
  let buttonDisabled = false;

  let alert = getDefaultAlertValues();

  let module = {
    moduleName: "",
    moduleDescription: "",
    moduleSvg: "",
    moduleDashboardPlugins: [],
  };
  let allMaps = [];

  onMount(async () => {
    db = await $firebase.firestore();
    let querySnapshot = await db.collection("maps").get();
    allMaps = [];
    querySnapshot.forEach((doc) => {
      let map = doc.data();
      // for each path
      map.paths.forEach((path) => {
        path.points = JSON.parse(path.points);
      });

      map.mapId = doc.id;
      allMaps.push(map);
    });
  });

  async function createModule() {
    let data = formatMapObject(module, false, true, false);
    data.moduleDashboardPlugins = getPluginDataFromForm(module.moduleDashboardPlugins);
    alert = getDefaultAlertValues();
    data.authorId = $user.uid;
    data.createdAt =$firebase.firestore.Timestamp.now().seconds;
    data.modifiedAt =$firebase.firestore.Timestamp.now().seconds;
    try {
      let collectionRef = db.collection("modules");
      let result = await collectionRef.add(data);
      alert.success = true;
      alert.successTitle = $t("module-created-success");
      alert.successMessage = "id: " + result.id;
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
  }

  async function formSubmit() {
    buttonDisabled = true;
    await createModule();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<svelte:window bind:scrollY={y} />
<ResultFeedback bind:alert />

<div>
  <div class="mt-2 md:flex md:items-center md:justify-between">
    <div class="flex-1 min-w-0">
      <div>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {$t("create-new-module-with-a-map")}
        </p>
      </div>
    </div>
  </div>
</div>
<form
  class="space-y-8 divide-y divide-gray-200"
  on:submit|preventDefault={formSubmit}
>
  <ModuleForm bind:module bind:allMaps />

  <div class="pt-5">
    <div class="flex justify-end">
      <Button
        dataTest="create-module-submit-button"
        content={$t("create-module-button")}
        isSubmit={true}
        color="primary"
        isDisabled={buttonDisabled}
      />
    </div>
  </div>
</form>
