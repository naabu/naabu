<script>
  import EditModule from "$lib/Module/Components/edit.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getStores, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  import { t, locale } from "svelte-intl-precompile";

  let menuitems;
 
  let module;
  TimeAgo.addLocale(en);
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo($locale);

  $: if (module) {
    menuitems = getTeacherMenuitems($page.url.pathname, $t);
  }

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
    }
  })();
</script>

<GetModuleData  bind:module loadComponent={"form"} />

<Sidebar bind:menuitems>
  <span slot="title">{$t("update-module")}</span>

  <span slot="content">
    {#if$firebase && module}
      <EditModule  bind:module />
    {/if}
  </span>
</Sidebar>
