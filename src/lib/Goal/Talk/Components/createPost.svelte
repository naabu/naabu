<script>
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { getDateString } from "$lib/Internals/Misc/helper";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import Textarea from "../../../Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import { t } from "svelte-intl-precompile";
  ;
  export let talk;
  export let goalId;
  export let revision;
  let hasCurriculumProfile;

  let newPostTitle = "";
  let newPostText = "";
  let buttonDisabled = false;
  let db;

  if (revision) {
    newPostTitle = $t("discuss-revision") + " " + getDateString(revision.createdAt);
    newPostText = "";
  }

  onMount(async () => {
    db = await firebase.firestore();
  });

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

  async function createPost() {
    if ($session.user) {
      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.player.curriculumProfileId);

      let data = {
        title: newPostTitle,
        text: newPostText,
        numberOfReplies: 0,
      };
      let snap = await profileRef.get();
      if (snap.exists) {
        let profileData = snap.data();
        data.curriculumProfile = {
          fullname: profileData.fullname,
          institution: profileData.institution,
        };
        data.authorId = profileRef.id;
      }

      alert = getDefaultAlertValues();
      try {
        let postsResult = await db
          .collection("talk")
          .doc(talk.id)
          .collection("posts")
          .add(data);
        alert.success = true;
        alert.successTitle = $t("post-created-success");
        alert.successMessage = "id: " + postsResult.id;
        await goto("/overleg/" + goalId + "/" + talk.id + "/" + postsResult.id);
      } catch (e) {
        console.error($t("can-not-create-post") +": ", e);
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createPost();
    newPostTitle = "";
    newPostText = "";
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<ResultFeedback bind:alert />
<CheckPlayerHasProfile bind:hasCurriculumProfile />

{#if talk}
  <div class="ml-auto mr-auto max-w-xl mt-8">
    <form on:submit|preventDefault={formSubmit}>
      <FormField title={$t("title")} forId="title">
        <TextInput bind:value={newPostTitle} dataTest="post-title" id="title" />
      </FormField>
      <FormField title={$t("post")} forId="post">
        <Textarea id="post" bind:value={newPostText} rows="3" />
        <svelte:fragment slot="after">
          <div class="mt-4 flex justify-between">
            <AdditionalFormText
              content={$t("keep-it-friendly-and-professional")}
            />
            <Button
              dataTest="post-button"
              isDisabled={buttonDisabled || !hasCurriculumProfile}
              isSubmit={true}
              color="primary"
              content={$t("post")}
            />
          </div>
        </svelte:fragment>
      </FormField>
    </form>
  </div>
{/if}
