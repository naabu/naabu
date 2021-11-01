<script>
  import WorkOnAdventure from "$lib/Goal/Adventure/work.svelte";
  import ConnectionTemplate from "$lib/Containers/connectionTemplate.svelte";
  import { getStores, page } from "$app/stores";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let goal;
  let firebase;
  let breadcrumbs;
  let adventureRef;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/avonturen",
        value: "Activiteiten",
      },
      {
        url: $page.path,
        value: "Activiteit pagina",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <WorkOnAdventure
    bind:goal
    bind:firebase
    bind:adventureId={$page.params.adventureId}
  />
</ConnectionTemplate>
