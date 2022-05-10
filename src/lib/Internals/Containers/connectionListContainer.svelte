<script>
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import GetConnectionListsData from "$lib/Goal/Connection/Data/getConnectionListsData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getStores, page, session } from "$app/stores";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import LearningGoalConnectionsTabs from "$lib/Internals/Tabs/learningGoalConnections.svelte";
  import ConnectionStatusTabs from "$lib/Internals/Tabs/connectionStatus.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import ConnectionLinkList from "$lib/Goal/Connection/Components/connectionLinkList.svelte";
  import { t } from "svelte-intl-precompile";
  import {
    getAlgoliaSearchClient,
    getConnectionIndex,
  } from "$lib/Internals/Algolia/algolia";
  import { onMount } from "svelte";

  export let connectionType;
  export let urlType;

  let statusses = [
    "published",
    "needs-approval",
    "in-progress",
    "needs-work",
    "in-trash",
  ];

  let goal;
  let firebase;
  let connections;
  let connectionIndexName = getConnectionIndex($session.environment);
  let connectionIndex;
  let query = "";
  let status = "all";
  let filters = "";

  $: (async () => {
    filters = filters + "type:" + connectionType
    if (status !== "all") {
      filters = "status:" + status;
    }
    await search();
  })();

  let hits;
  let breadcrumbsConnection;
  let selectedTab;

  let mounted;
  let valueUrlConnectionType;

  onMount(async () => {
    const searchClient = getAlgoliaSearchClient();
    connectionIndex = searchClient.initIndex(connectionIndexName);
    mounted = true;
    await search();
  });

  async function search() {
    if (mounted) {
      const result = await connectionIndex.search(query, {
        filters: filters,
      });
      connections = result.hits;
    }
  }

  $: if (goal) {
    if (connectionType) {
      if (connectionType === "goal-activity") {
        selectedTab = "activities";
        urlType = "activiteiten";
        valueUrlConnectionType = $t("activities");
      }
      else if (connectionType === "goal-assessment") {
        selectedTab = "assessments";
        urlType = "assessments";
        valueUrlConnectionType = $t("assessments");
      }
      else {
        selectedTab = "connections";
        if (connectionType === "goal-prerequisites") {
          urlType = "voorkennis";
          valueUrlConnectionType = $t("prior-knowledge");
        } else if (connectionType === "goal-deeperunderstandings") {
          urlType = "dieper-inzicht";
          valueUrlConnectionType = $t("deeper-insight");
        } else if (connectionType === "goal-bigideas") {
          urlType = "groot-idee";
          valueUrlConnectionType = $t("big-ideas");
        } else if (connectionType === "goal-specializations") {
          urlType = "specialisatie";
          valueUrlConnectionType = $t("specializations");
        }
      }
    } else if (urlType) {
      switch (urlType) {
        case "voorkennis":
          valueUrlConnectionType = $t("prior-knowledge");
          connectionType = "goal-prerequisites";
          break;
        case "dieper-inzicht":
          valueUrlConnectionType = $t("deeper-insight");
          connectionType = "goal-deeperunderstandings";
          break;
        case "groot-idee":
          valueUrlConnectionType = $t("big-ideas");
          connectionType = "goal-bigideas";
          break;
        case "specialisatie":
          valueUrlConnectionType = $t("specializations");
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

  let breadcrumbs;
  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);
    breadcrumbs = [...breadcrumbs, breadcrumbsConnection];
  }
</script>

<GetGoalData bind:goal bind:firebase />

{#if mounted && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <MainTabs bind:goal mainSelected={selectedTab} />
  {#if connectionType !== "goal-activity" && connectionType !== "goal-assessment" && connectionType !== "goal-knowledge-component"}
    <LearningGoalConnectionsTabs bind:goal mainSelected={connectionType} />
  {/if}

  <div>
    <div class="relative flex items-center justify-center mt-4 mb-4">
      <div class="w-full sm:max-w-xs mt-6">
        <label for="search" class="sr-only">{$t("search")}</label>
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search"
            name="search"
            class="pr-3 block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={$t("search")}
            type="search"
            bind:value={query}
            on:keyup={search}
            on:search={search}
          />
        </div>
      </div>
      <div class="ml-4">
        <label
          for="status-filter"
          class="block text-sm font-medium text-gray-700"
          >{$t("filter-on-status")}</label
        >
        <select
          id="status-filter"
          name="status-filter"
          bind:value={status}
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option class:selected={status == "all"} value="all"
            >{$t("all")}</option
          >
          {#each statusses as statusOption}
            <option class:selected={status == statusOption} value={statusOption}
              >{$t(statusOption)}</option
            >
          {/each}
        </select>
      </div>
    </div>
  </div>

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
  {$t("loading")}
{/if}
