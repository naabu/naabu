<script>
  import ListGoals from "$lib/Goal/Components/list.svelte";
  import ManagementTabs from "$lib/Internals/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
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
