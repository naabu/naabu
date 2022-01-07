<script>
  import EditModule from "$lib/Module/Components/edit.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";

  import { formatToTimeAgo } from "$lib/Internals/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import { getStatusTranslation } from "$lib/Activity/Components/helper";

  let menuitems;
  let firebase;
  let module;
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");

  $: if (module) {
    menuitems = getTeacherMenuitems($page.path);
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

<GetModuleData bind:firebase bind:module />

<Sidebar bind:menuitems>
  <span slot="title"> Module wijzigen</span>

  <span slot="content">
    {#if firebase && module}
      <EditModule bind:firebase bind:module />
    {/if}
  </span>
</Sidebar>
