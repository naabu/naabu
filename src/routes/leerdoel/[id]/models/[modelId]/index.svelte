<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";
  import ModelConnectionPage from "$lib/Goal/Model/ConnectionPage.svelte";

  let connection = null;
  let model = null;
  ;
  let timer;
  let timeout = false;
  let goal;
  let loaded = false;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/models",
        value: $t("models"),
      },
      {
        url: $page.url.pathname,
        value: $t("model-page"),
      },
    ];
  }

  $: (async () => {
    if ($firebase && !loaded) {
      loaded = true;
      firebase = $firebase;

      timer = setInterval(retrieveConnection, 500);
      await retrieveModel();
      setTimeout(() => {
        clearInterval(timer);
        timeout = true;
      }, 10000);
    }
  })();

  async function retrieveModel() {
    let db = await firebase.firestore();
    let ref = db.collection("models").doc($page.params.modelId);
    let snap = await ref.get();
    if (snap.exists) {
      model = snap.data();
      model.id = $page.params.modelId;
    }
  }

  async function retrieveConnection() {
    let db = await firebase.firestore();
    let ref = db
      .collection("connections")
      .where("type", "==", "goal-model")
      .where("sourceId", "==", $page.params.id)
      .where("linkId", "==", $page.params.modelId)
      .limit(1);
    let querySnapshot = await ref.get();

    connection = null;
    querySnapshot.forEach((updateDoc) => {
      connection = updateDoc.data();
      connection.id = updateDoc.id;
      clearInterval(timer);
    });
  }
</script>

<GetGoalData  bind:goal />

{#if connection !== null && model !== null}
  <ConnectionTemplate bind:goal  bind:breadcrumbs>
    <ConnectionPage bind:goal  bind:connection>
      <ModelConnectionPage bind:model bind:connection />
    </ConnectionPage>
  </ConnectionTemplate>
{:else if timeout}
  Could not find connection, please reload the page.
{:else}
  Loading connection for model...
{/if}
