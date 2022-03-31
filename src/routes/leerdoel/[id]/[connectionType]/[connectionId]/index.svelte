<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetConnectionData from "$lib/Goal/Connection/Data/getConnectionData.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";

  let goal;
  let connection;

  let firebase;
  let breadcrumbs;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/" + $page.params.connectionType,
        value: capitalizeFirstLetter($page.params.connectionType),
      },
      {
        url: $page.url.pathname,
        value: capitalizeFirstLetter($page.params.connectionType) + " connectie pagina",
      },
    ];
  }
</script>

<GetGoalData bind:firebase bind:goal />
<GetConnectionData bind:firebase bind:connection />

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <ConnectionPage bind:goal bind:firebase bind:connection />
</ConnectionTemplate>
