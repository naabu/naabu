<script>
  import CreateActivity from "$lib/Activity/create.svelte";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  let menuitems = getTeacherMenuitems($page.path);
  let firebase;
  let goal;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });
</script>

<GetGoalData bind:firebase bind:goal bind:goalId={$page.params.goalId} />
<Sidebar bind:menuitems>
  <span slot="title"> Activiteit maken</span>

  <span
    slot="status"
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
  >
    Concept
  </span>

  <span slot="content">
    {#if firebase && goal}
      <CreateActivity bind:firebase bind:goal />
    {/if}
  </span>
</Sidebar>
