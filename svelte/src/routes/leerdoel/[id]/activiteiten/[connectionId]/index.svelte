<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Connection/page.svelte";
  import ConnectionTemplate from "$lib/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";
  import GetConnectionData from "$lib/Connection/getConnectionData.svelte";
  import GetGoalData from "$lib/Goal/getGoalData.svelte";

  let goal;
  let connection;

  let firebase;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/activiteiten",
        value: "Activiteiten",
      },
      {
        url: $page.path,
        value: "Activiteit pagina",
      },
    ];
  }
</script>

<GetGoalData bind:firebase bind:goal/>
<GetConnectionData bind:firebase bind:connection/>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <ConnectionPage
    bind:goal
    bind:firebase
    bind:connection
  />
</ConnectionTemplate>
