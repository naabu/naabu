<script>
  // import$firebase from "firebase/app";
  
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import AssessmentForm from "$lib/Goal/Assessment/Form.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user, player } from "$lib/Internals/User/store";
  export let goal;

  let y;
  let buttonDisabled = false;


  let assessment = {
    title: "",
    description: "",
    goalId: "",
    plugins: "",
  };

  $: if (goal) {
    assessment.goalId = goal.id;
  }

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

  async function create() {
    if ($user) {
      let data = {
        title: assessment.title,
        description: assessment.description,
        goalId: assessment.goalId,
        authorId: $user.uid,
        plugins: getPluginDataFromForm(assessment.plugins),
      };

      alert = getDefaultAlertValues();
      try {
        const db = await $firebase.firestore();
        let result = await db.collection("assessments").add(data);
        alert.success = true;
        alert.successTitle = $t("assessment-created");
        alert.successMessage = "id: " + result.id;
        await goto("/leerdoel/" + assessment.goalId + "/assessments/" + result.id);
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
    await create();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<svelte:window bind:scrollY={y} />

<div>
  <ResultFeedback bind:alert />
  <CheckPlayerHasProfile />

  <form class="mt-8 space-y-8" on:submit|preventDefault={formSubmit}>
    <AssessmentForm bind:assessment  />
    <div class="pt-5">
      <div class="flex justify-end">
        <Button
          content={$t("create-assessment")}
          isDisabled={buttonDisabled || !$player.hasCurriculumProfile}
          isSubmit={true}
          color="primary"
        />
      </div>
    </div>
  </form>
</div>
