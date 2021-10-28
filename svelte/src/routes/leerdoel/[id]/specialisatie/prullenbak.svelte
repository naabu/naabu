<script>
  import Connections from "$lib/Goal/Connection/List/specializationInTrash.svelte";
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
        url: "/leerdoel/" + goal.id + "/specialisatie",
        value: "Specialisatie",
      },
      {
        url: $page.path,
        value: "Prullenbak",
      },
    ];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  <Connections bind:goal bind:firebase />
</ConnectionTemplate>
