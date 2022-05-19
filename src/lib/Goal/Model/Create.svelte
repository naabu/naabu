<script>
  // import firebase from "firebase/app";
  import { getStores, session } from "$app/stores";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import ModelForm from "$lib/Goal/Model/Form.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  export let firebase;
  
  $:console.log(firebase);
  export let goal;

  let y;
  let buttonDisabled = false;
  let hasCurriculumProfile;

  let model = {
    title: "",
    description: "",
    problemState: "",
    solutionState: "",
    goalId: "",
  };

  $: if (goal) {
    model.goalId = goal.id;
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
        title: model.title,
        description: model.description,
        problemState: model.problemState,
        solutionState: model.solutionState,
        goalId: model.goalId,
        authorId: $session.user.uid,
      };

      alert = getDefaultAlertValues();
      try {
        let db = await firebase.firestore();
        let result = await db.collection("models").add(data);
        alert.success = true;
        alert.successTitle = $t("model-created");
        alert.successMessage = "id: " + result.id;
        await goto("/leerdoel/" + model.goalId + "/model/" + result.id);
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
    <ModelForm bind:model />
    <div class="pt-5">
      <div class="flex justify-end">
        <Button
          content={$t("create-model")}
          isDisabled={buttonDisabled || !hasCurriculumProfile}
          isSubmit={true}
          color="primary"
        />
      </div>
    </div>
  </form>
</div>
