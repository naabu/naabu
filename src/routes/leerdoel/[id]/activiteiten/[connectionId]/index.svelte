<script>
  import { getStores, page } from "$app/stores";
  import ConnectionPage from "$lib/Goal/Connection/Components/page.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetConnectionData from "$lib/Goal/Connection/Data/getConnectionData.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import ActivityConnectionPage from "$lib/Activity/Components/ConnectionPage.svelte";
  import { t } from "svelte-intl-precompile";

  let goal;
  let connection;
  let isTeacher = false;

 
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/leerdoel/" + goal.id + "/activiteiten",
        value: $t("activities"),
      },
      {
        url: $page.url.pathname,
        value: $t("activity-page"),
      },
    ];
  }
</script>

<GetGoalData  bind:goal />
<GetConnectionData  bind:connection />

{#if connection !== null}
  <ConnectionTemplate bind:goal  bind:breadcrumbs>
    <ConnectionPage bind:goal  bind:connection bind:isTeacher>
      <ActivityConnectionPage bind:connection bind:isTeacher/>
    </ConnectionPage>
  </ConnectionTemplate>
{/if}
