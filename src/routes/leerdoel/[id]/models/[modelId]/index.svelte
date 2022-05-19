<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";

  let connection = null;
  let firebase;
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
    if ($firebaseStore && !loaded) {
      loaded = true;
      firebase = $firebaseStore;
      timer = setInterval(retrieveFirestoreData, 500);
      setTimeout(() => {
        clearInterval(timer);
        timeout = true;
      }, 10000);
    }
  })();

  async function retrieveFirestoreData() {
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

<GetGoalData bind:firebase bind:goal />

{#if connection !== null}
  <ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
    <ConnectionPage bind:goal bind:firebase bind:connection />
  </ConnectionTemplate>
{:else if timeout}
  Could not find connection, please reload the page.
{:else}
  Loading connection for model...
{/if}
