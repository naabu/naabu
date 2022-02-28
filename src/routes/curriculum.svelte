<script>
  import ListGoals from "$lib/Goal/Components/list.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { t } from "svelte-intl-precompile";

  let breadcrumbs = [
    {
      url: "/curriculum",
      value: $t("curriculum"),
    },
  ];
</script>

<ContainerBreadcrumpPageTitle bind:breadcrumbs title={$t("search-goals")} />
<ListGoals>
  <a
    slot="link"
    data-test="create-goal-link"
    class="ml-4 underline float-right mt-4 mb-4"
    href="/leerdoel/maken"
  >
    {$t("create-new-goal")}
  </a>
</ListGoals>
