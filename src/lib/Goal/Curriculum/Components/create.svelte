<script>
  import Form from "$lib/Goal/Curriculum/Components/form.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import CurriculumTabs from "$lib/Internals/Tabs/curriculum.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { login } from "$lib/Internals/Firebase/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user, player } from "$lib/Internals/User/store";

  let curriculumProfile = {
    fullname: "",
    institution: "",
    institutionEmail: "",
    credentials: "",
  };

  $: if ($user) {
    curriculumProfile.uid = $user.uid;
  }

  let buttonDisabled;

  $: {
    if (!$user || $user.isAnonymous) {
      buttonDisabled = true;
    } else {
      buttonDisabled = false;
    }
  }
  let y;
  let alert = getDefaultAlertValues();

  // $: if ($player && $player.curriculumProfileId) {
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
    let db = $firebase.firestore();
    buttonDisabled = true;
    let data = curriculumProfile;
    delete data.id;
    alert = getDefaultAlertValues();
    try {
      if (!$player.curriculumProfileId) {
        let profileRef = db.collection("curriculumProfile");
        let result = await profileRef.add(data);
        $player.curriculumProfileId = result.id;
        let playerRef = db.collection("players").doc($user.uid);
        await playerRef.update({ curriculumProfileId: result.id, curriculumProfileName: data.fullname });
        alert.success = true;
        alert.successTitle = "Curriculum profiel gemaakt";
        alert.successMessage = "id: " + result.id;
      } else {
        let profileRef = db
          .collection("curriculumProfile")
          .doc($player.curriculumProfileId);
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



  async function signInWithGoogle() {
    let fb = $firebase;
    let result = await login(fb, $t);
    if (result !== null) {
      $user = result.user;
      $player = result.player;
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
    {#if !$user || $user.isAnonymous}
      <div>
        <Button on:click={signInWithGoogle} isLinkToGoogle={true} />
      </div>
    {:else}
      <p>{$user.email}</p>
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
