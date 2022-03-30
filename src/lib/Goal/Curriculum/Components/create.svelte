<script>
  import Form from "$lib/Goal/Curriculum/Components/form.svelte";
  import { getStores, session, page } from "$app/stores";
  import { goto } from "$app/navigation";
  import CurriculumTabs from "$lib/Internals/Tabs/curriculum.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { login } from "$lib/Internals/Firebase/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  export let firebase;

  let curriculumProfile = {
    fullname: "",
    institution: "",
    institutionEmail: "",
    credentials: "",
  };

  $: if ($session.user) {
    curriculumProfile.uid = $session.user.uid;
  }

  let buttonDisabled;

  $: {
    if (!$session.user || $session.user.isAnonymous) {
      buttonDisabled = true;
    } else {
      buttonDisabled = false;
    }
  }
  let y;
  let db;
  let alert = getDefaultAlertValues();

  // $: if ($session.player && $session.player.curriculumProfileId) {
  //   redirect();
  // }

  let redirectUrl = $page.url.searchParams.get("redirect");

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  async function redirect() {
    if (redirectUrl) {
      if (redirectUrl === "/leerdoel/maken") {
        await goto("/leerdoel/maken");
      } else if (redirectUrl.startsWith("/leerdoel")) {
        await goto(redirectUrl);
      } else if (redirectUrl.startsWith("/overleg")) {
        await goto(redirectUrl);
      } else {
        await goto("/curriculum-profiel/mijn-profiel");
      }
    } else {
      await goto("/curriculum-profiel/mijn-profiel");
    }
  }

  async function createCurriculumProfile() {
    buttonDisabled = true;
    let data = curriculumProfile;
    delete data.id;
    alert = getDefaultAlertValues();
    try {
      if (!$session.player.curriculumProfileId) {
        let profileRef = db.collection("curriculumProfile");
        let result = await profileRef.add(data);
        $session.player.curriculumProfileId = result.id;
        let playerRef = db.collection("players").doc($session.user.uid);
        await playerRef.update({ curriculumProfileId: result.id });
        alert.success = true;
        alert.successTitle = "Curriculum profiel gemaakt";
        alert.successMessage = "id: " + result.id;
      } else {
        let profileRef = db
          .collection("curriculumProfile")
          .doc($session.player.curriculumProfileId);
        let result = await profileRef.update(data);
        alert.success = true;
        alert.successTitle = $t("curriculum-profile-created-success");
      }
      await redirect();
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

  async function signInWithGoogle() {
    let result = await login(firebase, $t);
    if (result !== null) {
      $session.user = result.user;
      $session.player = result.player;
    }
  }
</script>

<svelte:window bind:scrollY={y} />

<ResultFeedback bind:alert />

<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <p class="text-sm font-medium text-gray-700">{$t("create-profile-with")}</p>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    {#if !$session.user || $session.user.isAnonymous}
      <div>
        <Button on:click={signInWithGoogle} isLinkToGoogle={true} />
      </div>
    {:else}
      <p>{$session.user.email}</p>
    {/if}
  </div>
</div>

<form class="mt-8" on:submit|preventDefault={createCurriculumProfile}>
  <Form bind:curriculumProfile />

  <div class="mt-4 flex justify-end">
    <Button
      isDisabled={buttonDisabled}
      dataTest="submit-button"
      isSubmit={true}
      color="primary"
      content={$t("curriculum-profile-create-button")}
    />
  </div>
</form>
