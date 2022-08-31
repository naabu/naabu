<script>
  // import$firebase from "firebase/app";
  
  import ModelForm from "$lib/Goal/Model/Form.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";
  import { user, player } from "$lib/Internals/User/store";

  $: (async () => {
    if ($firebase) {
    }
  })();

  export let goal;
  export let model;

  let y;
  let buttonDisabled = false;
  export let hasCurriculumProfile = false;

  $: {
    if ($player && $player.curriculumProfileId) {
      hasCurriculumProfile = true;
    } else {
      hasCurriculumProfile = false;
    }
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

  async function edit() {
    if ($user) {
      let data = {
        title: model.title,
        description: model.description,
        statesKCArray: model.statesKCArray,
        goalId: model.goalId,
        authorId: $user.uid,
        linkedActivityConnectionIds: model.linkedActivityConnectionIds,
      };

      alert = getDefaultAlertValues();
      try {
        let db = await $firebase.firestore();
        let result = await db.collection("models").doc(model.id).set(data);
        alert.success = true;
        alert.successTitle = $t("model-saved");
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
    await edit();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<svelte:window bind:scrollY={y} />

<div>
  <ResultFeedback bind:alert />

  <form class="mt-8 space-y-8" on:submit|preventDefault={formSubmit}>
    <ModelForm bind:model bind:goal bind:hasCurriculumProfile/>
    <div class="pt-5">
      <div class="flex justify-end">
        <Button
          content={$t("save-model")}
          isDisabled={buttonDisabled || !hasCurriculumProfile}
          isSubmit={true}
          color="primary"
        />
      </div>
    </div>
  </form>
</div>
