<script>
  import { getDateString } from "$lib/Internals/Misc/helper";
  import { sortOnLastReplyAt } from "$lib/Internals/Revision/helper";
  import CreatePostForm from "$lib/Goal/Talk/Components/createPost.svelte";
  import MainTabs from "$lib/Internals/Tabs/talk.svelte";
  import { t } from "svelte-intl-precompile";
  export let firebase;
  export let talk;
  export let posts;
  export let goalId;

  sortOnLastReplyAt(posts);
</script>

{#if talk}
  {#if talk.type === "goal"}
    <MainTabs bind:objectId={goalId} talkType={talk.type} talkId={talk.id} />
  {/if}

  <CreatePostForm bind:firebase bind:goalId bind:talk />
  <div class="mt-4 ml-auto mr-auto max-w-xl">
    <h1 class="sr-only">{$t("recent-posts")}</h1>
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
                    {#if post.createdAt}
                      <time>{getDateString(post.createdAt)}</time>
                    {/if}
                  </p>
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-700 space-y-4">
              <a
                class="cursor-pointer"
                href="/overleg/{goalId}/{talk.id}/{post.id}"
              >
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
                <span class="inline-flex items-center text-sm">
                  <span
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
                    <span class="sr-only">{$t("replies")}</span>
                  </span>
                </span>
              </div>
            </div>
          </article>
        </li>
      {/each}
    </ul>
  </div>
{/if}
