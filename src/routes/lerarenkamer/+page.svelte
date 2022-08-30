<script>
  import ListOpenActivities from "$lib/Internals/Teachers/listOpenActivities.svelte";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getStores, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import { t } from "svelte-intl-precompile";
  
  let menuitems = getTeacherMenuitems($page.url.pathname, $t);
</script>

<Sidebar bind:menuitems>
  <span slot="title">{$t("dashboard")}</span>

  <span slot="content">
    <ListOpenActivities />
  </span>
</Sidebar>
