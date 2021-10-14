<script>
  import { formatToTimeAgo } from "$lib/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  export let firebase;
  export let adventureArray;
  export let goalId;

  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");
</script>

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="avontuur-maken"> Nieuw advontuur maken</a>
</div>

{#if adventureArray && adventureArray.length > 0}
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
                >
                  Titel
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Moeilijkheid
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Gewijzigd op
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Laatste update
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each adventureArray as adventure}
                <tr>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {adventure.title}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {adventure.difficulty}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {formatToTimeAgo(adventure.modifiedAt, firebase, timeAgo)}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {formatToTimeAgo(
                        adventure.lastUpdatesAt,
                        firebase,
                        timeAgo
                      )}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/leerdoel/{goalId}/avontuur/{adventure.id}/work"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Geschiedenis</a
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
{:else}
  Geen avonturen gevonden
{/if}
