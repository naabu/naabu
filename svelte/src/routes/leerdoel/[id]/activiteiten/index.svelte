<script>
  import ActivityConnectionListContainer from "$lib/Containers/activityConnectionListContainer.svelte";

</script>

<ActivityConnectionListContainer status="published"/>

<!-- <script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import GetConnectionListsData from "$lib/Connection/getConnectionListsData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import { getStores, page } from "$app/stores";
  import ConnectionList from "$lib/Connection/list.svelte";
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/connectionStatus.svelte";
import { getDifficultyToString } from "$lib/Activity/helper";

  let goal;
  let firebase;
  let mounted;
  let connections;
  let type = "activiteiten";

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
    for (let i =0; i< connection.fields.length; i++) {
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
  status="published"
  bind:firebase
  bind:mounted
  bind:connections
/>
{#if mounted && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <MainTabs bind:goal mainSelected="activities" />
  <SecondTabs bind:goal bind:type mainSelected="published" />
  {#if connections}
    <ConnectionList
      bind:type
      bind:goalId={goal.id}
      bind:connections
      bind:firebase
      let:connection
    >
      <a
        slot="createButton"
        class="underline ml-auto"
        href="/lerarenkamer/activiteit/maken/{goal.id}"
      >
        Nieuwe activiteit maken</a
      >

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
{/if} -->
