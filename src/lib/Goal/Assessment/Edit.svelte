<!-- <script>
  // import$firebase from "firebase/app";
  // import { getFirebaseFirestore } from "$lib/firebase";
  // import { collection, getDoc, updateDoc, query, getDocs, doc } from "firebase/firestore";
  import { page } from "$app/stores";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import GoalForm from "$lib/Goal/Components/form.svelte";
  import { onMount } from "svelte";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import {
    createGoalRevision,
    getGoalSaveData,
  } from "$lib/Goal/Components/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { user } from "$lib/Internals/User/store";
  
  export let battleCol;
 
  export let previousBattles = [];
  let hasCurriculumProfile;
  let y;

  export let goalRef;
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
    let data = getGoalSaveData(goal, $session.serverFirestoreTimeStamp);
    alert = getDefaultAlertValues();
    try {
      let goalRef = db.collection("goals").doc(goal.id);
      await goalRef.update(data);
      for (let i = 0; i < goal.battles.length; i++) {
        let battleDocRef = db.doc(
          "/goals/" + goalRef.id + "/battles/" + goal.battles[i].name
        );
        let battleData = {
          quizzes: goal.battles[i].quizzes,
        };

        let snap = await battleDocRef.get();
        if (snap.exists) {
          await battleDocRef.update(battleData);
        } else {
          await battleDocRef.set(battleData);
        }
      }

      for (let i = 0; i < previousBattles.length; i++) {
        let previousBattle = previousBattles[i];
        let deleteBattle = true;
        for (let i2 = 0; i2 < goal.battles.length; i2++) {
          let newBattle = goal.battles[i2];
          if (newBattle.name === previousBattle.name) {
            deleteBattle = false;
          }
        }
        if (deleteBattle) {
          let battleDocRef = db.doc(
            "/goals/" + goalRef.id + "/battles/" + previousBattle.name
          );
          await battleDocRef.delete();
        }
      }

      data.authorId = $player.curriculumProfileId;
      data.goalId = goalRef.id;
      await createGoalRevision(db, goal, data, $user.uid,$firebase);

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
    <form
      class="space-y-8"
      on:submit|preventDefault={formSubmit}
    >
      <GoalForm bind:goal />

      <div class="pt-5">
        <div class="flex justify-end">
          <Button
            isDisabled={!hasCurriculumProfile}
            dataTest="edit-goal-submit-button"
            isSubmit={true}
            color="primary"
            content={$t("publish-goals")}
          />
        </div>
      </div>
    </form>
  </div>
{/if} -->
Hello edit!
