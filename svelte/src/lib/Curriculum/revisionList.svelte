<script>
  import { goto } from "$app/navigation";
  import { getDateString, truncate } from "$lib/Misc/helper";
  import { sortOnCreatedAt } from "$lib/Revision/helper";
  export let curriculumProfile;

  $: if (curriculumProfile.revisionList) {
    sortOnCreatedAt(curriculumProfile.revisionList);
  }
</script>

{#if curriculumProfile.revisionList}
  <h3 class=" mt-5 mb-5 text-lg leading-6 font-medium text-gray-900">
    Revisies
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
                          href="/revisie/{revision.previousRevisionId}/diff/{revision.id}"
                        >
                          {getDateString(revision.createdAt)}
                        </a>
                      {:else}
                        {getDateString(revision.createdAt)}
                      {/if}
                    </td>
                    <td class="px-6 py-4">
                      {#if revision.id && revision.goalTitle}
                        <div class="text-sm text-gray-900">
                          <a class="underline" href="/revisie/{revision.id}"
                            >{@html truncate(revision.goalTitle, 70)}</a
                          >
                        </div>
                      {/if}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a
                        href="/revisie/{revision.id}"
                        class="text-indigo-600 hover:text-indigo-900"
                        >Bekijken</a
                      >
                      <a
                        href="/revisie/{revision.id}/wijzigen"
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
  </div>
{/if}
