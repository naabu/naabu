<script>
  import { getStores, session } from "$app/stores";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import ModelForm from "$lib/Goal/Model/Form.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
 
  export let goal;

  let y;
  let buttonDisabled = false;
  let hasCurriculumProfile = false;

  let model = {
    title: "",
    description: "",
    linkedActivityConnectionIds: [],
    statesKCArray: [],
    goalId: "",
  };

  $: if (model && model.statesKCArray && model.statesKCArray.length == 0) {
    model.statesKCArray.push({
      type: "state",
      label: $t("problem"),
      abstract: model.problemState,
      example: "",
    });
    model.statesKCArray.push({
      type: "kc",
      abstract: "",
      label: $t("knowledge_component") + " 1",
      activities: [],
    });
    model.statesKCArray.push({
      type: "state",
      label: $t("solution"),
      abstract: model.solutionState,
      example: "",
    });
  }

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
        statesKCArray: model.statesKCArray,
        goalId: model.goalId,
        authorId: $session.user.uid,
        linkedActivityConnectionIds: model.linkedActivityConnectionIds,
      };

      alert = getDefaultAlertValues();
      try {
        let db = await $firebase.firestore();
        let result = await db.collection("models").add(data);
        alert.success = true;
        alert.successTitle = $t("model-created");
        alert.successMessage = "id: " + result.id;
        await goto("/leerdoel/" + model.goalId + "/models/" + result.id);
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

  {#if model && goal}
    <form class="mt-8 space-y-8" on:submit|preventDefault={formSubmit}>
      <ModelForm bind:model bind:goal bind:hasCurriculumProfile />
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
  {/if}
</div>
