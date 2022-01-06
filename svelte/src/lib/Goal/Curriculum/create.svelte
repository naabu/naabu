<script>
  import Form from "$lib/Goal/Curriculum/form.svelte";
  import { getStores, session, page } from "$app/stores";
  import { goto } from "$app/navigation";
  import CurriculumTabs from "$lib/Internals/Tabs/curriculum.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { login } from "$lib/Internals/Firebase/helper";

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

  let redirectUrl = $page.query.get("redirect");

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
        alert.successTitle = "Curriculum profiel gemaakt";
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
    let result = await login(firebase);
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
  <p class="text-sm font-medium text-gray-700">Profiel aanmaken met</p>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    {#if !$session.user || $session.user.isAnonymous}
      <div>
        <button id="linkGoogleButton" on:click={signInWithGoogle} />
      </div>
    {:else}
      <p>{$session.user.email}</p>
    {/if}
  </div>
</div>

<form class="mt-8" on:submit|preventDefault={createCurriculumProfile}>
  <Form bind:curriculumProfile />
  <button
    disabled={buttonDisabled}
    data-cy="submit-button"
    class="mt-4 float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >Curriculum profiel aanmaken</button
  >
</form>

<style>
  #linkGoogleButton {
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url("/btn_google_signin_dark_normal_web@2x.png");
  }

  #linkGoogleButton:hover {
    background-image: url("/btn_google_signin_dark_focus_web@2x.png");
  }

  #linkGoogleButton:focus {
    background-image: url("/btn_google_signin_dark_pressed_web@2x.png");
    outline: none;
  }

  #linkGoogleButton {
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url("/btn-signup-google-dutch-normal.svg");
  }

  #linkGoogleButton:hover {
    background-image: url("/btn-signup-google-dutch-hover.svg");
  }

  #linkGoogleButton:focus {
    background-image: url("/btn-signup-google-dutch-pressed.svg");
    outline: none;
  }
</style>
