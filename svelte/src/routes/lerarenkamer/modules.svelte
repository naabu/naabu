<script>
  import ListOpenActivities from "$lib/Teachers/listOpenActivities.svelte";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getStores, page } from "$app/stores";
  import { getLoungeMenuitems } from "$lib/Teachers/helper";
  let menuitems = getLoungeMenuitems($page.path);
</script>

<Sidebar bind:menuitems>
  <span slot="title"> Modules </span>

  <span slot="content">
    <ListOpenActivities />
  </span>
</Sidebar>
