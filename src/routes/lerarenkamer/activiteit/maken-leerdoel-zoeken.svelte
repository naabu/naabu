<script>
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getStores, session, page } from "$app/stores";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import ListGoals from "$lib/Goal/Components/list.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";

  let activityId = $page.url.searchParams.get("activityId");

  let menuitems = getTeacherMenuitems($page.url.pathname, $t);
 
  let db;

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
      db = await $firebase.firestore();
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
  <span slot="title">{$t("create-activity")}</span>

  <span slot="content">
    <ListGoals let:goalId let:goalTitle let:index>
      <span slot="cta-learning-goal">
        {#if activityId}
          <a
            on:click|preventDefault={() => editLearningGoal(goalId, goalTitle)}
            href="/lerarenkamer/activiteit/{activityId}"
            class="text-indigo-600 hover:text-indigo-900">{$t("select")}</a
          >
        {:else}
          <a
            data-test="select-learning-goal-{index}"
            href="/lerarenkamer/activiteit/maken/{goalId}"
            class="text-indigo-600 hover:text-indigo-900">{$t("select")}</a
          >
        {/if}
      </span>
    </ListGoals>
  </span>
</Sidebar>
