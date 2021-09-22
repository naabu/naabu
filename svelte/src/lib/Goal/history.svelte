<script>
  import { getDateString } from "$lib/Misc/helper";

  export let goal;
  export let firebase;
  import MainTabs from "$lib/Tabs/goal.svelte";

  $: if (goal.revisionList) {
    goal.revisionList = goal.revisionList.reverse();
  }
  
</script>

<MainTabs bind:goal subSelected="history" />

{#if goal.revisionList}
  <div class="flex flex-col">
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
              {#each goal.revisionList as revision}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {getDateString(revision.createdAt)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">SeriousPapa</div>
                    <div class="text-sm text-gray-500">Super editor</div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/revisie/{revision.id}"
                      class="text-indigo-600 hover:text-indigo-900">Bekijken</a
                    >
                    <a
                      href="/revisie/{revision.id}/revert"
                      class="text-indigo-600 hover:text-indigo-900">Revert</a
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
