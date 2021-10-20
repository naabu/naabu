<script>
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { getDateString } from "$lib/Misc/helper";
  import { goto } from "$app/navigation";
  export let firebase;
  export let talk;
  export let goalId;
  export let revision;

  let newPostTitle = "";
  let newPostText = "";
  let buttonDisabled = false;
  let db;

  if (revision) {
    newPostTitle = "Overleg revisie " + getDateString(revision.createdAt);
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
        alert.successTitle = "Post gemaakt";
        alert.successMessage = "id: " + postsResult.id;
        await goto("/overleg/" + goalId + "/" + talk.id + "/" + postsResult.id);
      } catch (e) {
        console.error("Kan post niet maken: ", e);
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

{#if talk}
  <div class="ml-auto mr-auto max-w-xl mt-8">
    <form on:submit|preventDefault={formSubmit}>
      <div class="col-span-6 sm:col-span-4">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Titel</label
        >
        <input
          type="text"
          data-cy="post-title"
          bind:value={newPostTitle}
          name="title"
          id="title"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label for="post" class="block text-sm font-medium text-gray-700">
          Post
        </label>
        <div class="mt-1">
          <textarea
            id="post"
            name="post"
            rows="3"
            bind:value={newPostText}
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div class="mt-4">
          <span class=" text-sm text-gray-500">
            Hou het vriendelijk en proffesioneel
          </span>
          <button
            data-cy="post-button"
            disabled={buttonDisabled}
            type="submit"
            class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Post</button
          >
        </div>
      </div>
    </form>
  </div>
{/if}
