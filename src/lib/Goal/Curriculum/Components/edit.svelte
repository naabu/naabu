<script>
  import Form from "$lib/Goal/Curriculum/Components/form.svelte";
  
  import CurriculumTabs from "$lib/Internals/Tabs/curriculum.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user, player } from "$lib/Internals/User/store";

  export let curriculumProfile;

  let buttonDisabled = false;
  let y;
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

  async function updateCurriculumProfile() {
    buttonDisabled = true;
    let data = curriculumProfile;
    alert = getDefaultAlertValues();
    let db = $firebase.firestore();
    try {
      let profileRef = db.collection("curriculumProfile").doc(data.id);
      let result = await profileRef.set(data);
      alert.success = true;
      alert.successTitle = $t("curriciulum-profile-edit-success");
      alert.successMessage = "id: " + data.id;
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }


</script>

<svelte:window bind:scrollY={y} />

{#if $player}
  <CurriculumTabs
    bind:curriculumProfile
    subSelected="edit"
    isOwnProfile="true"
  />
  <ResultFeedback bind:alert />

  <form on:submit|preventDefault={updateCurriculumProfile}>
    <Form bind:curriculumProfile isEdit="true" />
    <div class="mt-4 flex justify-end">
      <Button
        isDisabled={buttonDisabled}
        dataTest="submit-button"
        content={$t("curriculum-profile-update-button")}
        isSubmit={true}
        color="primary"
      />
    </div>
  </form>
{/if}
