<script>
  import ListModules from "$lib/Teachers/dataTableModules.svelte";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import GetMapsListData from "$lib/Module/getListData.svelte";
  import { getStores, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import { goto } from "$app/navigation";
  let menuitems = getTeacherMenuitems($page.path);
  let modules = [];
  let ready = false;
  let firebase; 

  function submitButton() {
    goto("/lerarenkamer/module/maken");
  }
</script>

<GetMapsListData bind:modules bind:mounted={ready} bind:firebase />

<Sidebar bind:menuitems>

  <span slot="cta-button">
    <button
      on:click={submitButton}
      data-cy="create-module-button"
      class="t-4 float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Module aanmaken
    </button>
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
