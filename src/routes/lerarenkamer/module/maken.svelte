<script>
  import CreateModule from "$lib/Module/Components/create.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getStores, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import { t } from "svelte-intl-precompile";

  let menuitems = getTeacherMenuitems($page.url.pathname, $t);
 

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
    }
  })();
</script>

<Sidebar bind:menuitems>
  <span slot="title">{$t("create-module")}</span>
  <span slot="content">
    {#if$firebase}
      <CreateModule  />
    {/if}
  </span>
</Sidebar>
