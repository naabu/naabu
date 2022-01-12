<script>
  import ListGoals from "$lib/Goal/Components/list.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
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
    data-test="create-goal-link"
    class="ml-4 underline float-right mt-4 mb-4"
    href="/leerdoel/maken"
  >
    Nieuw leerdoel maken</a
  >
</ListGoals>
