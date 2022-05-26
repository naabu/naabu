<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import AssessmentConnectionPage from "$lib/Goal/Assessment/ConnectionPage.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";

  let connection = null;
 
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
        url: "/leerdoel/" + goal.id + "/assessments",
        value: $t("assessments"),
      },
      {
        url: $page.url.pathname,
        value: $t("assessment-page"),
      },
    ];
  }

  $: (async () => {
    if ($firebase && !loaded) {
      loaded = true;
     $firebase = $firebase;
      timer = setInterval(retrieveFirestoreData, 500);
      setTimeout(() => {
        clearInterval(timer);
        timeout = true;
      }, 10000);
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db
      .collection("connections")
      .where("type", "==", "goal-assessment")
      .where("sourceId", "==", $page.params.id)
      .where("linkId", "==", $page.params.assessmentId)
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

{#if connection !== null}
  <ConnectionTemplate bind:goal  bind:breadcrumbs>
    <ConnectionPage bind:goal  bind:connection>
      <AssessmentConnectionPage bind:connection />
    </ConnectionPage>
  </ConnectionTemplate>
{:else if timeout}
  Could not find connection, please reload the page.
{:else}
  Loading connection for assessment...
{/if}
