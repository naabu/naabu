<script>
  import Form from "./form.svelte";
  import { getStores, session } from "$app/stores";
  import { goto } from "$app/navigation";
  import CurriculumTabs from "$lib/Tabs/curriculum.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  export let firebase;
  let curriculumProfile = {
    fullname: "",
    institution: "",
    institutionEmail: "",
    credentials: "",
  };
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

  async function createCurriculumProfile() {
    buttonDisabled = true;
    let data = curriculumProfile;
    delete data.id;
    alert = getDefaultAlertValues();
    try {
      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.player.id);
      let result = await profileRef.set(data);
      alert.success = true;
      alert.successTitle = "Curriculum profiel gemaakt";
      alert.successMessage = "id: " + $session.player.id;
      await goto("/curriculum-profiel/mijn-profiel");
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
<CurriculumTabs bind:curriculumProfile mainSelected="create" isNew="true" />

{#if $session.player}
  <ResultFeedback bind:alert />

  <form on:submit|preventDefault={createCurriculumProfile}>
    <Form bind:curriculumProfile />
    <button
      disabled={buttonDisabled}
      class="mt-4 float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Curriculum profiel aanmaken</button
    >
  </form>
{/if}
