<script>
  // import SearchLearningGoals from "$lib/Teachers/CreateActivitySearchLearningGoal.svelte";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getStores, page } from "$app/stores";
  import { getLoungeMenuitems } from "$lib/Teachers/helper";
  let menuitems = getLoungeMenuitems($page.path);
  import ListGoals from '$lib/Goal/list.svelte';
</script>

<Sidebar bind:menuitems>
  <span slot="title"> Activiteit maken</span>

  <span slot="content">
    <ListGoals let:goalId>
      <span slot="cta-learning-goal">
        <a
        href="/lerarenkamer/activiteit/{goalId}"
        class="text-indigo-600 hover:text-indigo-900">Selecteren</a
      >
      </span>
      </ListGoals>
    <!-- <SearchLearningGoals /> -->
  </span>
</Sidebar>
