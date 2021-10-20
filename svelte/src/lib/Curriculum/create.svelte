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

  $: console.log($session);

  $: if ($session.user) {
    curriculumProfile.uid = $session.user.uid
  }

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
      if (!$session.player.curriculumProfileId) {
        console.log('test');
        let profileRef = db.collection("curriculumProfile");
        console.log(data);
        let result = await profileRef.add(data);
        $session.player.curriculumProfileId = result.id;
        let playerRef = db.collection('players').doc($session.user.uid);
        await playerRef.update({curriculumProfileId: result.id});
        alert.success = true;
        alert.successTitle = "Curriculum profiel gemaakt";
        alert.successMessage = "id: " + result.id;
      }
      else {
        let profileRef = db.collection("curriculumProfile").doc($session.player.curriculumProfileId);
        let result = await profileRef.update(data);
        alert.success = true;
        alert.successTitle = "Curriculum profiel gemaakt";
      }
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
      data-cy="submit-button"
      class="mt-4 float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Curriculum profiel aanmaken</button
    >
  </form>
{/if}
