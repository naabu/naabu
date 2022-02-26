<script>
  import { goto } from "$app/navigation";
  import { getDateString, truncate } from "$lib/Internals/Misc/helper";
  import { sortOnCreatedAt } from "$lib/Internals/Revision/helper";
  import { t } from "svelte-intl-precompile";
  export let curriculumProfile;

  $: if (curriculumProfile.postList) {
    sortOnCreatedAt(curriculumProfile.postList);
  }

</script>

{#if curriculumProfile.postList}
  <h3 class=" mt-5 mb-5 text-lg leading-6 font-medium text-gray-900">
    {$t("post-and-answers")}
  </h3>

  <div>
    <div class="flex flex-col w-full">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  {$t("made-on")}

                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  {$t("post-title")}
                    
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  {$t("goal-title")}
                    
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each curriculumProfile.postList as post}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <a
                        class="underline"
                        href="/overleg/{post.goalId}/{post.talkId}/{post.postId}"
                      >
                        {getDateString(post.createdAt)}
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">
                        <a
                          class="underline"
                          href="/overleg/{post.goalId}/{post.talkId}/{post.postId}"
                        >
                          {#if post.type === "post" && post.postTitle}
                            {@html truncate(post.postTitle, 70)}
                          {:else}
                            {@html truncate(post.replyText, 70)}
                          {/if}
                        </a>
                      </div>
                    </td>

                    <td class="px-6 py-4">
                      {#if post.goalId && post.goalTitle}
                        <div class="text-sm text-gray-900">
                          <a
                            class="underline"
                            href="/overleg/{post.goalId}/{post.talkId}"
                            >{@html truncate(post.goalTitle, 70)}</a
                          >
                        </div>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
