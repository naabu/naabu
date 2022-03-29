<script>
  import ListOpenActivities from "$lib/Internals/Teachers/listOpenActivities.svelte";
  import GetActivityListData from "$lib/Activity/Data/getActivityListData.svelte";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getStores, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import { t } from "svelte-intl-precompile";

  let menuitems = getTeacherMenuitems($page.path, $t);
  let activities;
  let firebase;
</script>

<GetActivityListData bind:firebase bind:activities status="open" />

<Sidebar bind:menuitems>
  <span slot="title">{$t("open-activities")} </span>

  <span slot="cta-button">
    <a
      href="/lerarenkamer/activiteit/maken-leerdoel-zoeken"
      data-test="create-activity-button"
      class="t-4 float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {$t("create-activity")}
    </a>
  </span>

  <span slot="content">
    {#if activities}
      <ListOpenActivities bind:firebase bind:activities />
    {:else}
      {$t("loading")}
    {/if}
  </span>
</Sidebar>
