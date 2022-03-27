<script>
  import EditModule from "$lib/Module/Components/edit.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  import { t, locale } from "svelte-intl-precompile";
  
  let menuitems;
  let firebase;
  let module;
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

<Sidebar bind:menuitems>
  <span slot="title">{$t("update-module")}</span>

  <span slot="content">
    {#if firebase && module}
      <EditModule bind:firebase bind:module />
    {/if}
  </span>
</Sidebar>
