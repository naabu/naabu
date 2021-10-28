<script>
  import Connections from "$lib/Goal/Connection/List/prerequisitePublished.svelte";
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
        url: "/leerdoel/" + goal.id + "/voorkennis",
        value: "Voorkennis",
      },
      {
        url: $page.path,
        value: "Gepubliceerd",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <Connections bind:goal bind:firebase />
</ConnectionTemplate>
