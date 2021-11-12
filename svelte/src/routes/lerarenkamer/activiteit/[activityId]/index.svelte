<script>
  import EditActivity from "$lib/Activity/edit.svelte";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getLoungeMenuitems } from "$lib/Teachers/helper";
  import GetActivityData from "$lib/Activity/getActivityData.svelte";

  let menuitems = getLoungeMenuitems($page.path);
  let firebase;
  let activity;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });
</script>

<GetActivityData bind:firebase bind:activity/>
<Sidebar bind:menuitems>
  <span slot="title"> Activiteit maken</span>

  <span
    slot="status"
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
  >
    Concept
  </span>

  <span slot="content">
    {#if firebase && activity}
      <EditActivity bind:firebase bind:activity />
    {/if}
  </span>
</Sidebar>
