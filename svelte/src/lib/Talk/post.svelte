<script>
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { getDateString } from "$lib/Misc/helper";
  import { sortOnCreatedAt, sortOnLastReplyAt } from "$lib/Revision/helper";
  import MainTabs from "$lib/Tabs/talk.svelte";
  export let talkId;
  export let post;
  export let replies;
  export let goalId;
  sortOnCreatedAt(replies);
  replies.reverse();
  export let firebase;
  let newReplyText = "";
  let buttonDisabled = false;
  let db;

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

  async function createReply() {
    if ($session.user &&  $session.user.idTokenResult.claims.curriculumProfileId) {
      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.user.idTokenResult.claims.curriculumProfileId);

      let data = {
        text: newReplyText,
        authorId: $session.user.idTokenResult.claims.curriculumProfileId,
      };
      let snap = await profileRef.get();
      if (snap.exists) {
        let profileData = snap.data();
        data.curriculumProfile = {
          fullname: profileData.fullname,
          institution: profileData.institution,
        };
      }

      alert = getDefaultAlertValues();
      try {
        let replyResult = await db
          .collection("talk")
          .doc(talkId)
          .collection("posts")
          .doc(post.id)
          .collection("replies")
          .add(data);
        alert.success = true;
        alert.successTitle = "Antwoord gemaakt";
        alert.successMessage = "id: " + replyResult.id;
        let newReply = data;
        newReply.id = replyResult.id;
        newReply.createdAt = Date.now() / 1000;
        replies = [...replies, newReply];
        let postData = post;
        if (!post.numberOfReplies) {
          post.numberOfReplies = 0;
        }
        post.numberOfReplies = post.numberOfReplies + 1;
        let postResult = db
          .collection("talk")
          .doc(talkId)
          .collection("posts")
          .doc(post.id)
          .update({ numberOfReplies: post.numberOfReplies });
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
    await createReply();
    newReplyText = "";
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<ResultFeedback bind:alert />

{#if goalId}
  <MainTabs bind:objectId={goalId} bind:talkId talkType="goal" />
{/if}
{#if post}
  <div class="ml-auto mr-auto max-w-2xl mt-8">
    <form on:submit|preventDefault={formSubmit}>
      <div>
        <label for="reply" class="block text-sm font-medium text-gray-700">
          Antwoord
        </label>
        <div class="mt-1">
          <textarea
            id="reply"
            name="reply"
            rows="3"
            bind:value={newReplyText}
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div class="mt-4">
          <span class=" text-sm text-gray-500">
            Hou het vriendelijk en proffesioneel
          </span>
          <button
            disabled={buttonDisabled}
            type="submit"
            class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Antwoorden</button
          >
        </div>
      </div>
    </form>
  </div>

  
  <div class="mt-4 ml-auto mr-auto max-w-2xl">
    <!-- <h1 class="sr-only">Recent posts</h1> -->
    <ul role="list" class="space-y-4">
      <article aria-labelledby="question-title-81614">
        <div>
          <div class="flex space-x-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">
                <a
                  data-cy="profile-link"
                  class="hover:underline"
                  href="/curriculum-profiel/{post.authorId}"
                  >{post.curriculumProfile.fullname}</a
                >
                - {post.curriculumProfile.institution}
              </p>
              <p class="text-sm text-gray-500">
                <!-- <a href="#" class="hover:underline">
                  <time datetime="2020-12-09T11:43:00"
                    >December 9 at 11:43 AM</time
                  >
                </a> -->
                {#if post.createdAt}
                  <time>{getDateString(post.createdAt)}</time>
                {/if}
              </p>
            </div>
            <div class="flex-shrink-0 self-center flex">
              <div class="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                    id="options-menu-0-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open options</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <!-- <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg> -->
                  </button>
                </div>

                <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                <!-- <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-0-button" tabindex="-1">
            </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-700 space-y-4">
          <h2
            id="question-title-81614"
            class="mt-4 mb-2 text-base font-medium text-gray-900"
          >
            {#if post.title}
              {post.title}
            {/if}
          </h2>
          <p>
            {#if post.text}
              {post.text}
            {/if}
          </p>
        </div>

        <div class="mt-6 flex justify-between space-x-8">
          <div class="flex text-sm">
            <span class="inline-flex items-center text-sm">
              <button
                type="button"
                class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <!-- <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                  />
                </svg> -->
                <!-- <span class="font-medium text-gray-900">Share</span> -->
              </button>
            </span>
          </div>
        </div>
      </article>

      {#each replies as reply}
        <li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby="question-title-81614">
            <div>
              <div class="flex space-x-3">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    <a
                      class="hover:underline"
                      href="/curriculum-profiel/{reply.authorId}"
                      >{reply.curriculumProfile.fullname}</a
                    >
                    - {reply.curriculumProfile.institution}
                  </p>
                  <p class="text-sm text-gray-500">
                    <!-- <a href="#" class="hover:underline">
                      <time datetime="2020-12-09T11:43:00"
                        >December 9 at 11:43 AM</time
                      >
                    </a> -->
                    {#if reply.createdAt}
                      <time>{getDateString(reply.createdAt)}</time>
                    {/if}
                  </p>
                </div>
                <div class="flex-shrink-0 self-center flex">
                  <div class="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                        id="options-menu-0-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span class="sr-only">Open options</span>
                        <!-- Heroicon name: solid/dots-vertical -->
                        <!-- <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg> -->
                      </button>
                    </div>

                    <!--
                  Dropdown menu, show/hide based on menu state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                    <!-- <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-0-button" tabindex="-1">
                </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-700 space-y-4">
              <p>
                {#if reply.text}
                  {reply.text}
                {/if}
              </p>
            </div>

            <div class="mt-6 flex justify-between space-x-8">
              <div class="flex text-sm">
                <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <!-- <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                      />
                    </svg> -->
                    <!-- <span class="font-medium text-gray-900">Share</span> -->
                  </button>
                </span>
              </div>
            </div>
          </article>
        </li>
      {/each}
    </ul>
  </div>
{/if}
