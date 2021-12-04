<script>
  import { getDifficultyToString, getTypeText } from "$lib/Activity/helper";
  import { formatToTimeAgo } from "$lib/Misc/helper";
  import nl from "javascript-time-ago/locale/nl.json";
  import { getStores, page } from "$app/stores";
  import TimeAgo from "javascript-time-ago";

  export let modules;
  export let firebase;
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");
</script>

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
                Module
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Laatste wijziging
              </th>
              <slot name="table-header" />
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each modules as module, index}
              <tr>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {module.moduleName}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {formatToTimeAgo(module.modifiedAt, firebase, timeAgo)}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="/lerarenkamer/module/{module.id}"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >Wijzigen</a
                  >
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if modules.length === 0}
          <div class="m-4">
            Geen modules gevonden. <a
              class="underline"
              href="/lerarenkamer/module/maken"
            >
              Je kan hier een module maken</a
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
