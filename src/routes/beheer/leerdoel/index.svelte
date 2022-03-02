<script>
  import ListGoals from "$lib/Goal/Components/list.svelte";
  import ManagementTabs from "$lib/Internals/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import { t } from "svelte-intl-precompile";
  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
    },
    {
      url: "/beheer/leerdoel",
      value: $t("goal"),
    },
  ];
</script>

<ShowBreadcrumb bind:breadcrumbs />
<ManagementTabs mainSelected="goal" />
<ListGoals />
