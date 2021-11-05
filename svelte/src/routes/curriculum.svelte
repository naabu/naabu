<script>
  import ListGoals from "$lib/Goal/list.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  let breadcrumbs = [
    {
      url: "/curriculum",
      value: "Curriculum",
    },
  ];
</script>

<ContainerBreadcrumpPageTitle bind:breadcrumbs title="Leerdoelen zoeken" />
<ListGoals>
  <a
    slot="link"
    data-cy="create-goal-link"
    class="ml-4 underline float-right mt-4 mb-4"
    href="/leerdoel/maken"
  >
    Nieuw leerdoel maken</a
  >
</ListGoals>
