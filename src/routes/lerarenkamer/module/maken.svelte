<script>
  import CreateModule from "$lib/Module/Components/create.svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import { t } from "svelte-intl-precompile";

  let menuitems = getTeacherMenuitems($page.path, $t);
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

<Sidebar bind:menuitems>
  <span slot="title">{$t("create-module")}</span>
  <span slot="content">
    {#if firebase}
      <CreateModule bind:firebase />
    {/if}
  </span>
</Sidebar>
