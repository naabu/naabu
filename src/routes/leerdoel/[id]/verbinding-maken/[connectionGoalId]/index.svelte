<script>
  import CreateConnection from "$lib/Goal/Connection/Components/create.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getStores, page } from "$app/stores";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { t } from "svelte-intl-precompile";

  let goal;
  let connectionGoal;
  ;
  let breadcrumbs;
  let mounted;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/verbinding-maken",
        value: $t("search-connection-goal"),
      },
      {
        url: $page.url.pathname,
        value: $t("connection-information"),
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal  bind:breadcrumbs>
  <GetGoalData
    bind:goal={connectionGoal}
    bind:goalId={$page.params.connectionGoalId}
    
    bind:mounted
  />

  {#if mounted && goal && connectionGoal}
    <CreateConnection bind:goal bind:connectionGoal  />
  {/if}
</ConnectionTemplate>
