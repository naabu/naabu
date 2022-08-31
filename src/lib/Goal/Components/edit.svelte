<script>
  import { page } from "$app/stores";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import GoalForm from "$lib/Goal/Components/form.svelte";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import {
    createGoalRevision,
    getGoalSaveData,
  } from "$lib/Goal/Components/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { user, player } from "$lib/Internals/User/store";

  let hasCurriculumProfile;
  let y;
  export let goal;

  let alert = getDefaultAlertValues();

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  async function editGoal() {
    const db = await $firebase.firestore();
    let data = getGoalSaveData(goal, $firebase.firestore.Timestamp.now().seconds);
    alert = getDefaultAlertValues();
    try {
      let goalRef = db.collection("goals").doc(goal.id);
      await goalRef.update(data);
      data.authorId = $player.curriculumProfileId;
      data.goalId = goalRef.id;
      await createGoalRevision(db, goal, data, $user.uid, $firebase);

      alert.success = true;
      alert.successTitle = $t("goal-change");
      alert.successMessage = "id: " + goalRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
  }

  async function formSubmit(event) {
    await editGoal();
  }
</script>

<svelte:window bind:scrollY={y} />

{#if goal}
  <MainTabs bind:goal subSelected="edit" />
  <div class="mt-8">
    <ResultFeedback bind:alert />
    <CheckPlayerHasProfile bind:hasCurriculumProfile />
    <form class="space-y-8" on:submit|preventDefault={formSubmit}>
      <GoalForm bind:goal />

      <div class="pt-5">
        <div class="flex justify-end">
          <Button
            isDisabled={!hasCurriculumProfile}
            dataTest="edit-goal-submit-button"
            isSubmit={true}
            color="primary"
            content={$t("edit-goal")}
          />
        </div>
      </div>
    </form>
  </div>
{/if}
