<script>
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { getDateString } from "$lib/Misc/helper";
  import { goto } from "$app/navigation";
  import { sortOnCreatedAt } from "$lib/Revision/helper";

  export let talk;
  export let posts;
  sortOnCreatedAt(posts);
  export let firebase;

  $: console.log(posts);

  let newPostTitle = "";
  let newPostText = "";
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

  async function createPost() {
    if ($session.player && $session.player.id) {
      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.player.id);

      let data = {
        title: newPostTitle,
        text: newPostText,
        authorId: $session.player.id,
        numberOfReplies: 0,
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
        let postsResult = await db
          .collection("talk")
          .doc(talk.id)
          .collection("posts")
          .add(data);
        alert.success = true;
        alert.successTitle = "Post gemaakt";
        alert.successMessage = "id: " + postsResult.id;
        await goto("/overleg/" + talk.id + "/" + postsResult.id);
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
  <div class="ml-auto mr-auto max-w-2xl">
    Talk page type: {talk.type}

    <form on:submit|preventDefault={formSubmit}>
      <input type="text" bind:value={newPostTitle} />
      <textarea row="6" bind:value={newPostText} />
      <button
        disabled={buttonDisabled}
        type="submit"
        class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >Post</button
      >
    </form>
  </div>
  <div class="mt-4 ml-auto mr-auto max-w-2xl">
    <h1 class="sr-only">Recent posts</h1>
    <ul role="list" class="space-y-4">
      {#each posts as post}
        <li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby="question-title-81614">
            <div>
              <div class="flex space-x-3">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    <a
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
              <a class="cursor-pointer" href="/overleg/{talk.id}/{post.id}">
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
                </p></a
              >
            </div>

            <div class="mt-6 flex justify-between space-x-8">
              <div class="flex space-x-6">
                <!-- <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                      />
                    </svg>
                    <span class="font-medium text-gray-900">29</span>
                    <span class="sr-only">likes</span>
                  </button>
                </span> -->
                <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <!-- Heroicon name: solid/chat-alt -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="font-medium text-gray-900">
                      {#if post.numberOfReplies}
                        {post.numberOfReplies}
                      {:else}
                        0
                      {/if}
                    </span>
                    <span class="sr-only">replies</span>
                  </button>
                </span>
                <!-- <span class="inline-flex items-center text-sm">
                  <button
                    type="button"
                    class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="font-medium text-gray-900">2.7k</span>
                    <span class="sr-only">views</span>
                  </button>
                </span> -->
              </div>
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
