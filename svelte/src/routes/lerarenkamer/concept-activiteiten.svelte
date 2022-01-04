<script>
  import ListConceptActivities from "$lib/Teachers/listConceptActivities.svelte";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getStores, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import GetActivityListData from "$lib/Activity/getActivityListData.svelte";

  let menuitems = getTeacherMenuitems($page.path);
  import { goto } from "$app/navigation";
  let activities;
  let firebase;

</script>

<GetActivityListData bind:firebase bind:activities status="draft" />

<Sidebar bind:menuitems>
  <span slot="title"> Concept activiteiten </span>

  <span slot="cta-button">
    <a href="/lerarenkamer/activiteit/maken-leerdoel-zoeken"
      data-cy="create-activity-button"
      class="t-4 float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Activiteit aanmaken
  </a>
  </span>

  <span slot="content">
    {#if activities}
      <ListConceptActivities bind:firebase bind:activities />
    {:else}
      Loading...
    {/if}
  </span>
</Sidebar>
