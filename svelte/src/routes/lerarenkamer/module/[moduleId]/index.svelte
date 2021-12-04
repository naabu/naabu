<script>
  import EditModule from "$lib/Module/edit.svelte";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import GetModuleData from "$lib/Module/getModuleData.svelte";

  import { formatToTimeAgo } from "$lib/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import { getStatusTranslation } from "$lib/Activity/helper";

  let menuitems;
  let firebase;
  let module;
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");

  $: if (module) {
    menuitems = getTeacherMenuitems($page.path);
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });
</script>

<GetModuleData bind:firebase bind:module/>


<Sidebar bind:menuitems>
  <span slot="title"> Module wijzigen</span>

  <span slot="content">
    {#if firebase && module}
      <EditModule bind:firebase bind:module/>
    {/if}
  </span>
</Sidebar>
