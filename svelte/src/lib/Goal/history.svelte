<script>
  import { getDateString } from "$lib/Misc/helper";
  import { sortOnCreatedAt } from "$lib/Revision/helper";

  export let goal;
  import MainTabs from "$lib/Tabs/goal.svelte";

  $: if (goal.revisionList) {
    for (let revision of goal.revisionList) {
      revision.revisionId = revision.id;
    }
    sortOnCreatedAt(goal.revisionList);
  }
</script>

<MainTabs bind:goal subSelected="history" />

{#if goal.revisionList}
  <div class="flex flex-col mt-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        data-cy="history-table"
        class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                />
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Auteur
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each goal.revisionList as revision, i}
                <tr data-cy="revision{i}">
                  <td class="px-6 py-4 whitespace-nowrap">
                    {#if revision.previousRevisionId}
                      <a
                        data-cy="revision-index-{i}"
                        class="underline"
                        href="/revisie/{revision.revisionId}/diff/{revision.previousRevisionId}"
                      >
                        {getDateString(revision.createdAt)}
                      </a>
                    {:else}
                      {getDateString(revision.createdAt)}
                    {/if}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {#if revision.revisionAuthorId && revision.curriculumProfile}
                      <div class="text-sm text-gray-900">
                        <a
                          class="underline"
                          href="/curriculum-profiel/{revision.revisionAuthorId}"
                          >{revision.curriculumProfile.fullname}</a
                        >
                      </div>
                      <div class="text-sm text-gray-500">
                        {revision.curriculumProfile.institution}
                      </div>
                    {/if}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/revisie/{revision.revisionId}"
                      class="text-indigo-600 hover:text-indigo-900">Bekijken</a
                    >
                    <a
                      href="/revisie/{revision.revisionId}/wijzigen"
                      class="text-indigo-600 hover:text-indigo-900">Wijzig</a
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
{/if}
