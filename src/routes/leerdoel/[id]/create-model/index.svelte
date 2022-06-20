<script>
  import CreateModel from "$lib/Goal/Model/Create.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import { getStores, page } from "$app/stores";

  let goal;
  let mounted = false;
  let breadcrumbs = [];
  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);
    breadcrumbs = [
      ...breadcrumbs,

      {
        url: $page.url.pathname,
        value: $t("create-model"),
      },
      ,
    ];
  }

  $: (async () => {
    if ($firebase) {
    }
  })();
</script>

<GetGoalData bind:goal bind:mounted />

{#if $firebase}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={$t("create-model")} />
  <CreateModel bind:goal />
{/if}
