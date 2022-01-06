<script>
  import ListGoals from "$lib/Goal/list.svelte";
  import ManagementTabs from "$lib/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Goal/Breadcrumb/show.svelte";
  let breadcrumbs = [
    {
      url: "/beheer",
      value: "Beheer",
    },
    {
      url: "/beheer/leerdoel",
      value: "Leerdoel",
    },
  ];
</script>

<ShowBreadcrumb bind:breadcrumbs />
<ManagementTabs mainSelected="goal" />
<ListGoals />
