<script>
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import GetConnectionListsData from "$lib/Goal/Connection/Data/getConnectionListsData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getStores, page, session } from "$app/stores";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import LearningGoalConnectionsTabs from "$lib/Internals/Tabs/learningGoalConnections.svelte";
  import ConnectionStatusTabs from "$lib/Internals/Tabs/connectionStatus.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStatusText } from "$lib/Goal/Connection/Components/helper";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import ConnectionLinkList from "$lib/Goal/Connection/Components/connectionLinkList.svelte";

  export let connectionType;
  export let status;
  export let urlType;

  let goal;
  let firebase;
  let connections;

  let breadcrumbsConnection;
  let breadcrumbsStatus;
  let selectedTab;

  let mounted;

  let db;
  let publishedCount = "...";
  let needsApprovalCount = "...";
  let inProgressCount = "...";
  let needsWorksCount = "...";
  let trashCanCount = "...";
  let valueUrlConnectionType;

  $: if (status) {
    breadcrumbsStatus = {
      url: $page.path,
      value: getStatusText(status),
    };
  }

  $: if (goal) {
    if (connectionType) {
      if (connectionType === "goal-activity") {
        selectedTab = "activities";
        urlType = "activiteiten";
        valueUrlConnectionType = "Activiteiten";
      } else {
        selectedTab = "connections";
        if (connectionType === "goal-prerequisites") {
          urlType = "voorkennis";
          valueUrlConnectionType = "Voorkennis";
        } else if (connectionType === "goal-deeperunderstandings") {
          urlType = "dieper-inzicht";
          valueUrlConnectionType = "Dieper inzichten";
        } else if (connectionType === "goal-bigideas") {
          urlType = "groot-idee";
          valueUrlConnectionType = "Grote ideeën";
        } else if (connectionType === "goal-specializations") {
          urlType = "specialisatie";
          valueUrlConnectionType = "Specializaties";
        }
      }
    } else if (urlType) {
      switch (urlType) {
        case "voorkennis":
          valueUrlConnectionType = "Voorkennis";
          connectionType = "goal-prerequisites";
          break;
        case "dieper-inzicht":
          valueUrlConnectionType = "Dieper inzichten";
          connectionType = "goal-deeperunderstandings";
          break;
        case "goal-bigideas":
          valueUrlConnectionType = "Grote ideeën";
          connectionType = "goal-specializations";
          break;
        case "specialisatie":
          valueUrlConnectionType = "Specializaties";
          connectionType = "goal-specializations";
          break;
      }
    }
  }

  $: if (goal) {
    breadcrumbsConnection = {
      url: "/leerdoel/" + goal.id + "/" + urlType,
      value: valueUrlConnectionType,
    };
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      db = await firebase.firestore();
      mounted = true;
    }
  })();

  async function getCountStatus(queryStatus) {
    let ref = db
      .collection("connections")
      .where("sourceId", "==", goal.id)
      .where("type", "==", connectionType)
      .where("status", "==", queryStatus);
    let snap = await ref.get();
    return snap.size;
  }

  $: (async () => {
    if (goal) {
      publishedCount = await getCountStatus("published");
      needsApprovalCount = await getCountStatus("needs-approval");
      inProgressCount = await getCountStatus("in-progress");
      needsWorksCount = await getCountStatus("needs-work");
      trashCanCount = await getCountStatus("in-trash");
    }
  })();

  let breadcrumbs;
  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);
    breadcrumbs = [...breadcrumbs, breadcrumbsConnection, breadcrumbsStatus];
  }
</script>

<GetGoalData bind:goal bind:firebase />
{#if connectionType}
  <GetConnectionListsData
    bind:goalId={$page.params.id}
    bind:type={connectionType}
    bind:status
    bind:firebase
    bind:mounted
    bind:connections
  />
{/if}
{#if mounted && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <MainTabs bind:goal mainSelected={selectedTab} />
  {#if connectionType !== "goal-activity"}
    <LearningGoalConnectionsTabs bind:goal mainSelected={connectionType} />
  {/if}

  <ConnectionStatusTabs
    bind:goal
    bind:urlType
    bind:mainSelected={status}
    bind:publishedCount
    bind:needsApprovalCount
    bind:inProgressCount
    bind:needsWorksCount
    bind:trashCanCount
  />
  {#if connections}
    <slot {urlType} {connections} {firebase} {status} {goal}>
      <ConnectionLinkList
        {urlType}
        goalId={goal.id}
        {connections}
        {firebase}
        {status}
      />
    </slot>
  {:else}
    Loading...
  {/if}
{/if}
