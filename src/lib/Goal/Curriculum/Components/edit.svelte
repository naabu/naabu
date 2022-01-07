<script>
  import Form from "$lib/Goal/Curriculum/Components/form.svelte";
  import { getStores, session } from "$app/stores";
  import CurriculumTabs from "$lib/Internals/Tabs/curriculum.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  export let firebase;
  export let curriculumProfile;

  let buttonDisabled = false;
  let y;
  let db;
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
    try {
      let profileRef = db
        .collection("curriculumProfile")
        .doc(data.id);
      let result = await profileRef.set(data);
      alert.success = true;
      alert.successTitle = "Curriculum profiel gewijzigd";
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

  onMount(async () => {
    db = await firebase.firestore();
  });
</script>

<svelte:window bind:scrollY={y} />

{#if $session.player}
  <CurriculumTabs bind:curriculumProfile subSelected="edit" isOwnProfile=true />
  <ResultFeedback bind:alert />

  <form on:submit|preventDefault={updateCurriculumProfile}>
    <Form bind:curriculumProfile isEdit="true" />
    <button
      disabled={buttonDisabled}
      data-cy="submit-button"
      class="mt-4 float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Curriculum profiel wijzigen</button
    >
  </form>
{/if}
