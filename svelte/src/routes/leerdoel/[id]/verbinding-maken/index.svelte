<script>
   import SearchGoalForConnection from "$lib/Goal/Connection/search.svelte";
   import ConnectionTemplate from "$lib/Containers/connectionTemplate.svelte";
  import { getStores, page } from "$app/stores";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let goal;
  let firebase;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.path,
        value: "Verbinding maken, leerdoel zoeken",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <SearchGoalForConnection bind:goal bind:firebase />
</ConnectionTemplate>

  
