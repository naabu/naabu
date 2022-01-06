<script>
  import CreateConnection from "$lib/Goal/Connection/create.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getStores, page } from "$app/stores";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";
  import GetGoalData from "$lib/Goal/getGoalData.svelte";

  let goal;
  let connectionGoal;
  let firebase;
  let breadcrumbs;
  let mounted;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/verbinding-maken",
        value: "Verbinding maken leerdoel zoeken",
      },
      {
        url: $page.path,
        value: "Verbinding informatie",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <GetGoalData
    bind:goal={connectionGoal}
    bind:goalId={$page.params.connectionGoalId}
    bind:firebase
    bind:mounted
  />

  {#if mounted && goal && connectionGoal}
    <CreateConnection bind:goal bind:connectionGoal bind:firebase />
  {/if}
</ConnectionTemplate>
