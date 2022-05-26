<script>
  // import firebase from "firebase/app";
  import { getStores, session } from "$app/stores";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import AssessmentForm from "$lib/Goal/Assessment/Form.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";

  ;
  export let goal;

  let y;
  let db;
  let buttonDisabled = false;
  let hasCurriculumProfile;

  onMount(async () => {
    db = await firebase.firestore();
  });

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
    if ($session.user) {
      let data = {
        title: assessment.title,
        description: assessment.description,
        goalId: assessment.goalId,
        authorId: $session.user.uid,
        plugins: getPluginDataFromForm(assessment.plugins),
      };

      alert = getDefaultAlertValues();
      try {
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
  <CheckPlayerHasProfile bind:hasCurriculumProfile />

  <form class="mt-8 space-y-8" on:submit|preventDefault={formSubmit}>
    <AssessmentForm bind:assessment  />
    <div class="pt-5">
      <div class="flex justify-end">
        <Button
          content={$t("create-assessment")}
          isDisabled={buttonDisabled || !hasCurriculumProfile}
          isSubmit={true}
          color="primary"
        />
      </div>
    </div>
  </form>
</div>
