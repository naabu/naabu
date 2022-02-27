<script>
  import CreateActivity from "$lib/Activity/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { t } from "svelte-intl-precompile";
  let menuitems = getTeacherMenuitems($page.path, $t, "draft");
  let firebase;
  let goal;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

<GetGoalData bind:firebase bind:goal bind:goalId={$page.params.goalId} />
<Sidebar bind:menuitems>
  <span slot="title"> Activiteit maken</span>

  <span
    data-test="concept-status"
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
