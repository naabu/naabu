<script>
  import Button from "$lib/Internals/Button/Button.svelte";

  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import PluginForm from "$lib/Internals/Plugin/Form.svelte";
  import { t } from "svelte-intl-precompile";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import GetDashboardItemListData from "$lib/Internals/DashboardItem/GetDashboardItemListData.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";

  let dashboardItems = [];

  let mounted = false;
  let db;

  $: if ($firebase) {
    db = $firebase.firestore();
  }

  let newDashboardItem = {
    feedbackPlugins: [],
    modelPlugins: [],
  };

  function editFormSubmit(dashboardItem) {
    if (
      dashboardItem.feedbackPlugins.length > 0 &&
      dashboardItem.modelPlugins.length
    ) {
      let ref = db.collection("dashboardItems").doc(dashboardItem.id);
      let dashboardItemData = {
        modelPlugins: getPluginDataFromForm(dashboardItem.modelPlugins),
        feedbackPlugins: getPluginDataFromForm(dashboardItem.feedbackPlugins),
      };
      ref.update({ dashboardItemData });
    }
  }

  async function deleteDashboardItem(dashboardItem, index) {
    let ref = db.collection("dashboardItems").doc(dashboardItem.id);
    await ref.delete();
    dashboardItems.splice(index, 1);
    dashboardItems = dashboardItems;
  }

  async function createFormSumbit() {
    if (
      newDashboardItem.feedbackPlugins.length > 0 &&
      newDashboardItem.modelPlugins.length
    ) {
      let ref = db.collection("dashboardItems");
      let dashboardItemData = {
        modelPlugins: getPluginDataFromForm(newDashboardItem.modelPlugins),
        feedbackPlugins: getPluginDataFromForm(
          newDashboardItem.feedbackPlugins
        ),
      };
      let result = await ref.add(dashboardItemData);
      newDashboardItem.id = result.id;
      dashboardItems = [...dashboardItems, newDashboardItem];
      newDashboardItem = {
        feedbackPlugins: [],
        modelPlugins: [],
      };
    } else {
      console.error("dashboard items needs a model and feedback plugin");
    }
  }
</script>

<GetDashboardItemListData
  bind:dashboardItems
  bind:mounted
  bind:db
  svelteComponent="Form"
/>

{#if mounted}
  {#each dashboardItems as dashboardItem, index}
    <form
      class="space-y-8 divide-y divide-gray-200 border-2 p-2 m-4"
      on:submit|preventDefault={editFormSubmit}
    >
      <FieldSet title={$t("dashboard-item")}>
        <div slot="top" class="float-right">
          <Button
            on:click={() => deleteDashboardItem(dashboardItem, index)}
            color="whiteFullIconNoFocus"
            size="icon-square-small"
          >
            <span class="sr-only">{$t("close")}</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </Button>
        </div>
        {$t("feedback-plugins")}

        <PluginForm
          multiplePlugins={false}
          bind:plugins={dashboardItem.feedbackPlugins}
          filterType="feedback"
        />
        {$t("model-plugins")}
        <PluginForm
          multiplePlugins={false}
          bind:plugins={dashboardItem.modelPlugins}
          filterType="model"
        />
        <div class="">
          <div class="pt-5">
            <div class="flex justify-end">
              <Button content="Edit dashboard item" color="primary" />
            </div>
          </div>
        </div>
      </FieldSet>
    </form>
  {/each}

  <form
    class="space-y-8 divide-y divide-gray-200 border-2 p-2 m-4"
    on:submit|preventDefault={createFormSumbit}
  >
    <FieldSet title={$t("dashboard-item")}>
      {$t("feedback-plugins")}
      <PluginForm
        multiplePlugins={false}
        bind:plugins={newDashboardItem.feedbackPlugins}
        filterType="feedback"
      />

      {$t("model-plugins")}
      <PluginForm
        multiplePlugins={false}
        bind:plugins={newDashboardItem.modelPlugins}
        filterType="model"
      />
      <div class="">
        <div class="pt-5">
          <div class="flex justify-end">
            <Button
              isSubmit={true}
              content="Create new dashboard item"
              color="primary"
            />
          </div>
        </div>
      </div>
    </FieldSet>
  </form>
{:else}
  {$t("loading")}
{/if}
