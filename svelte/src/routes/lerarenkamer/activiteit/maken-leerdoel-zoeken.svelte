<script>
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getStores, session, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import ListGoals from "$lib/Goal/list.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";

  let activityId = $page.query.get("activityId");

  let menuitems = getTeacherMenuitems($page.path);
  let firebase;
  let db;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      db = await firebase.firestore();
    }
  })();

  async function editLearningGoal(goalId, goalTitle) {
    if (activityId) {
      let data = {
        goalId: goalId,
        goalTitle: goalTitle,
      };

      let ref = db.collection("activities").doc(activityId);
      await ref.update(data);
      goto("/lerarenkamer/activiteit/" + activityId);
    }
  }
</script>

<Sidebar bind:menuitems>
  <span slot="title"> Activiteit maken</span>

  <span slot="content">
    <ListGoals let:goalId let:goalTitle let:index>
      <span slot="cta-learning-goal">
        {#if activityId}
          <a
            on:click|preventDefault={() => editLearningGoal(goalId, goalTitle)}
            href="/lerarenkamer/activiteit/{activityId}"
            class="text-indigo-600 hover:text-indigo-900">Selecteren</a
          >
        {:else}
          <a
            data-cy="select-learning-goal-{index}"
            href="/lerarenkamer/activiteit/maken/{goalId}"
            class="text-indigo-600 hover:text-indigo-900">Selecteren</a
          >
        {/if}
      </span>
    </ListGoals>
  </span>
</Sidebar>
