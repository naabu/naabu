<script>
  // import firebase from "firebase/app";
  import { getStores, session } from "$app/stores";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import GoalForm from "$lib/Goal/Components/form.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import {
    createGoalRevision,
    getGoalSaveData,
  } from "$lib/Goal/Components/helper";
  import { getGoalIndex } from "$lib/Internals/Algolia/algolia";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";

  export let firebase;

  let y;
  let db;
  let buttonDisabled = false;
  let hasCurriculumProfile;
  let mounted = false;

  onMount(async () => {
    db = await firebase.firestore();
    mounted = true;
  });

  let goal = {
    title: "",
    description: "",
    goalLinks: [],
    taxonomy_bloom: [],
    taxonomy_solo: [],
    unitopic: "",
    multitopics: [],
    context: "",
    selectedVerbs: [],
    fromText: "",
    battles: [],
  };
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

  // $: if (mounted) {
  //   if ($session.player && $session.player.curriculumProfileId) {
  //     hasCurriculumProfile = true;
  //     buttonDisabled = false;
  //     alert = getDefaultAlertValues();
  //   } else {
  //     hasCurriculumProfile = false;
  //     alert.error = true;
  //     alert.errorCode = "no-curriculum-profile";
  //     buttonDisabled = true;
  //   }
  // }

  async function createGoal() {
    if ($session.user) {
      let data = getGoalSaveData(goal, $session.serverFirestoreTimeStamp);
      alert = getDefaultAlertValues();
      try {
        let talkResult = await db.collection("talk").add({ type: "goal" });
        data.talkId = talkResult.id;
        let goalResult = await db.collection("goals").add(data);
        for (let i = 0; i < goal.battles.length; i++) {
          let battleDocRef = db.doc(
            "/goals/" + goalResult.id + "/battles/" + goal.battles[i].name
          );
          let battleData = {
            quizzes: goal.battles[i].quizzes,
          };

          await battleDocRef.set(battleData);
        }

        data.authorId = $session.player.curriculumProfileId;
        data.goalId = goalResult.id;
        await createGoalRevision(db, goal, data, $session.user.uid, firebase);

        alert.success = true;
        alert.successTitle = "Leerdoel gemaakt";
        alert.successMessage = "id: " + goalResult.id;
        await goto("/leerdoel/" + goalResult.id);
      } catch (e) {
        console.error("Error adding document: ", e);
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
      y = 0;
    }
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createGoal();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<svelte:window bind:scrollY={y} />

<div>
  <ResultFeedback bind:alert />
  <CheckPlayerHasProfile bind:hasCurriculumProfile />

  <!-- <div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <p class="mt-1 max-w-2xl text-sm text-gray-500" />
        </div>
      </div>
    </div>
  </div> -->
  <form
    class="mt-8 space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={formSubmit}
  >
    <GoalForm bind:goal />
    <div class="pt-5">
      <div class="flex justify-end">
        <Button content="Leerdoel publiseren" 
          isDisabled={buttonDisabled || !hasCurriculumProfile}
          isSubmit={true}
          color="primary"
          dataTest="create-goal-submit-button"/>
      </div>
    </div>
  </form>
</div>
