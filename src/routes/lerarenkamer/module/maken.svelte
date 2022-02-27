<script>
  import CreateModule from "$lib/Module/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, session, page } from "$app/stores";
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
  <span slot="title"> Module maken</span>

  <!-- <span
    data-test="concept-status"
    slot="status"
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
  >
    Concept
  </span> -->

  <span slot="content">
    {#if firebase}
      <CreateModule bind:firebase />
    {/if}
  </span>
</Sidebar>
