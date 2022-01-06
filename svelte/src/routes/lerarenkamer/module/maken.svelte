<script>
  import CreateModule from "$lib/Module/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Interals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  let menuitems = getTeacherMenuitems($page.path);
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
    data-cy="concept-status"
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
