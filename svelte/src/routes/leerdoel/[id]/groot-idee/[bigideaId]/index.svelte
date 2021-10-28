<script>
  import WorkOnConnection from "$lib/Goal/Connection/work.svelte";
  import { getStores, page } from "$app/stores";
  import ConnectionTemplate from "$lib/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let goal;
  let firebase;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/groot-idee",
        value: "Grote ideeën",
      },
      {
        url: $page.path,
        value: "Verbinding pagina",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <WorkOnConnection
    bind:firebase
    bind:goal
    bind:connectionId={$page.params.bigideaId}
    collectionGroup="bigideas"
  />
</ConnectionTemplate>
