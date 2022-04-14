<script>
  import DashboardModule from "$lib/Module/Components/dashboard.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  import { t, locale } from "svelte-intl-precompile";
  import GetDashboardItemListData from "$lib/Internals/DashboardItem/GetDashboardItemListData.svelte";

  let menuitems;
  let firebase;
  let module;
  let mounted = false;
  let dashboardItems = [];
  TimeAgo.addLocale(en);
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo($locale);

  $: if (module) {
    menuitems = getTeacherMenuitems($page.url.pathname, $t);
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

<GetModuleData bind:firebase bind:module />

<GetDashboardItemListData bind:dashboardItems bind:mounted bind:firebase />
<Sidebar bind:menuitems>
  <span slot="title">{$t("module-dashboard")}</span>

  <span slot="content">
    {#if firebase && module && mounted}
      <DashboardModule bind:firebase bind:module bind:dashboardItems />
    {/if}
  </span>
</Sidebar>
