<script>
  import { goto } from "$app/navigation";
  import { getDateString, truncate } from "$lib/Internals/Misc/helper";
  import { sortOnCreatedAt } from "$lib/Internals/Revision/helper";
  import { t } from "svelte-intl-precompile";
 import DOMPurify from 'dompurify';
  export let curriculumProfile;

  $: if (curriculumProfile.revisionList) {
    for (let revision of curriculumProfile.revisionList) {
      revision.revisionId = revision.id;
    }
    sortOnCreatedAt(curriculumProfile.revisionList);
  }
</script>

{#if curriculumProfile.revisionList}
  <h3 class=" mt-5 mb-5 text-lg leading-6 font-medium text-gray-900">
    {$t("revisions")}
  </h3>

  <div>
    <div class="flex flex-col w-full">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <tbody class="bg-white divide-y divide-gray-200">
                {#each curriculumProfile.revisionList as revision}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {#if revision.previousRevisionId}
                        <a
                          class="underline"
                          href="/revisie/{revision.previousRevisionId}/diff/{revision.revisionId}"
                        >
                          {getDateString(revision.createdAt)}
                        </a>
                      {:else}
                        {getDateString(revision.createdAt)}
                      {/if}
                    </td>
                    <td class="px-6 py-4">
                      {#if revision.revisionId && revision.goalTitle}
                        <div class="text-sm text-gray-900">
                          <a class="underline" href="/revisie/{revision.revisionId}"
                            >{@html DOMPurify.sanitize(truncate(revision.goalTitle, 70))}</a
                          >
                        </div>
                      {/if}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a
                        href="/revisie/{revision.revisionId}"
                        class="text-indigo-600 hover:text-indigo-900"
                        >{$t("show")}</a
                      >
                      <a
                        href="/revisie/{revision.revisionId}/wijzigen"
                        class="text-indigo-600 hover:text-indigo-900">{$t("edit")}</a
                      >
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
