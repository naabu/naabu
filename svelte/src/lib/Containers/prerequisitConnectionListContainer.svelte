<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import GetConnectionListsData from "$lib/Connection/getConnectionListsData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import { getStores, page, session } from "$app/stores";
  import ConnectionList from "$lib/Connection/list.svelte";
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/connectionStatus.svelte";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";

  let goal;
  let firebase;
  let mounted;
  let connections;
  let type = "activiteiten";
  let db;
  let publishedCount = "...";
  let needsApprovalCount = "...";
  let inProgressCount = "...";
  let needsWorksCount = "...";
  let trashCanCount = "...";
  export let status;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    mounted = true;
  });

  async function getCountStatus(queryStatus) {
    let ref = db
      .collection("connections")
      .where("sourceId", "==", goal.id)
      .where("type", "==", "goal-activity")
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
    breadcrumbs = [
      {
        url: "/curriculum",
        value: "Curriculum",
      },
      {
        url: "/leerdoel/" + goal.id,
        value: "Leerdoel: " + goal.title,
      },
      {
        url: $page.path,
        value: "Activiteiten",
      },
      {
        url: $page.path,
        value: "Gepubliceerd",
      },
    ];
  }

  function getDifficulty(connection) {
    for (let i = 0; i < connection.fields.length; i++) {
      if (connection.fields[i].title === "Moeilijkheid") {
        return connection.fields[i].value;
      }
    }
    return "";
  }
</script>

<GetGoalData bind:goal bind:firebase />
<GetConnectionListsData
  bind:goalId={$page.params.id}
  type="goal-activity"
  bind:status
  bind:firebase
  bind:mounted
  bind:connections
/>
{#if mounted && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <MainTabs bind:goal mainSelected="activities" />
  <SecondTabs
    bind:goal
    urlTypebind:type
    bind:mainSelected={status}
    bind:publishedCount
    bind:needsApprovalCount
    bind:inProgressCount
    bind:needsWorksCount
    bind:trashCanCount
  />
  {#if connections}
    <ConnectionList
      urlTypebind:type
      bind:goalId={goal.id}
      bind:connections
      bind:firebase
      bind:status
      let:connection
    >
      <div slot="createButton" class="mt-8 mb-8 flex">
        <a
          class="underline ml-auto"
          href="/lerarenkamer/activiteit/maken/{goal.id}"
        >
          Nieuwe activiteit maken</a
        >
      </div>

      <th
        slot="tableHeader"
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Moeilijkheid
      </th>

      <td
        slot="tableD"
        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
      >
        {getDifficulty(connection)}
      </td>
    </ConnectionList>
  {:else}
    Loading...
  {/if}
{/if}
