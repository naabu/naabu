<script>
  import AdventureSearchActivity from "$lib/Goal/Adventure/searchActivity.svelte";
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
        value: "Adventuur maken, activiteit zoeken",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <AdventureSearchActivity bind:goal />
</ConnectionTemplate>
