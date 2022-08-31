<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import ActivityConnectionPage from "$lib/Activity/Components/ConnectionPage.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";

  let connection = null;
  let isTeacher = false;
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
        url: "/leerdoel/" + goal.id + "/activiteiten",
        value: $t("activities"),
      },
      {
        url: $page.url.pathname,
        value: $t("activity-page"),
      },
    ];
  }

  $: (async () => {
    if ($firebase && !loaded) {
      loaded = true;
     
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
      .where("type", "==", "goal-activity")
      .where("sourceId", "==", $page.params.id)
      .where("linkId", "==", $page.params.activityId)
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
    <ConnectionPage bind:goal  bind:connection bind:isTeacher>
      <ActivityConnectionPage bind:connection bind:isTeacher />
    </ConnectionPage>
  </ConnectionTemplate>
{:else if timeout}
  Could not find connection, please reload the page.
{:else}
  Loading connection for activity...
{/if}


<!-- <script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetConnectionData from "$lib/Goal/Connection/Data/getConnectionData.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import ActivityConnectionPage from "$lib/Activity/Components/ConnectionPage.svelte";
  import { t } from "svelte-intl-precompile";

  let goal;
  let connection;
  let isTeacher = false;

 
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/activiteiten",
        value: $t("activities"),
      },
      {
        url: $page.url.pathname,
        value: $t("activity-page"),
      },
    ];
  }
</script>

<GetGoalData  bind:goal />
<GetConnectionData  bind:connection />

{#if connection !== null}
  <ConnectionTemplate bind:goal  bind:breadcrumbs>
    <ConnectionPage bind:goal  bind:connection bind:isTeacher>
      <ActivityConnectionPage bind:connection bind:isTeacher/>
    </ConnectionPage>
  </ConnectionTemplate>
{/if} -->
