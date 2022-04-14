<script>
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { onMount } from "svelte";
  import { getDefaultAlertValues } from "$lib/Internals/Misc/helper";
  import { formatMapObject } from "$lib/Module/Components/helper";
  import { getStores, session } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import ShowDashboardPlugins from "$lib/Internals/Plugin/ShowDashboardPlugins.svelte";

  export let firebase;
  export let module;
  export let dashboardItems;
  let dataRetrieved = false;
  let lowLevelDataSet = [];

  $: (async () => {
    if (firebase && module) {
      exampleQueryExcercise();
    }
  })();

  async function exampleQueryExcercise() {
    let db = firebase.firestore();
    let ref = db.collection("lowLevelData").where("moduleId", "==", module.id);
    const querySnapshot = await ref.get();
    lowLevelDataSet = [];
    querySnapshot.forEach((doc) => {
      let lowLevelData = doc.data();
      lowLevelData.id = doc.id;
      lowLevelDataSet = [...lowLevelDataSet, lowLevelData];
    });
    dataRetrieved = true;
  }

  $: (async () => {
    if (dataRetrieved) {
      for (let i = 0; i < dashboardItems.length; i++) {
        for (let i2 = 0; i2 < dashboardItems[i].modelPlugins.length; i2++) {
          if (
            !dashboardItems[i].modelProcessed &&
            dashboardItems[i].modelPlugins[i2].calculate
          ) {
            dashboardItems[i].modelData = await dashboardItems[i].modelPlugins[
              i2
            ].calculate(lowLevelDataSet);
            dashboardItems[i].modelProcessed = true;
          }
        }
      }
    }
  })();
</script>

{#each dashboardItems as dashboardItem}
  {#if !dashboardItem.modelProcessed && dashboardItem.modelPlugins && dashboardItem.modelPlugins.length > 0}
    {$t("loading-data")}
    <svelte:component
      this={dashboardItem.modelPlugins[0].component}
      bind:calculate={dashboardItem.modelPlugins[0].calculate}
    />
  {:else if dashboardItem.feedbackPlugins && dashboardItem.feedbackPlugins.length > 0}
    <ShowDashboardPlugins
      bind:modelData={dashboardItem.modelData}
      bind:dashboardPlugins={dashboardItem.feedbackPlugins}
    />
  {:else}
    Something went wrong
  {/if}
{/each}
