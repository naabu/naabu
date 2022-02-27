<script>
  import ListModules from "$lib/Internals/Teachers/dataTableModules.svelte";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import GetMapsListData from "$lib/Module/Data/getListData.svelte";
  import { getStores, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import { t } from "svelte-intl-precompile";
  import { goto } from "$app/navigation";
  let menuitems = getTeacherMenuitems($page.path, $t);
  let modules = [];
  let ready = false;
  let firebase; 
</script>

<GetMapsListData bind:modules bind:mounted={ready} bind:firebase />

<Sidebar bind:menuitems>

  <span slot="cta-button">
    <a href="/lerarenkamer/module/maken"
      data-test="create-module-button-link"
      class="t-4 float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Module aanmaken
    </a>
  </span>
  <span slot="title"> Modules </span>

  <span slot="content">
     {#if ready}
      <ListModules bind:modules bind:firebase />
    {:else}
      Loading... 
    {/if}
  </span>
</Sidebar>
