<script>
  import OverviewPage from "$lib/Goal/Connection/overview.svelte";
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
        value: "Overzicht verbinding",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <OverviewPage bind:goal bind:firebase />
</ConnectionTemplate>
