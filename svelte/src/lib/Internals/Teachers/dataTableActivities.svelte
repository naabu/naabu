<script>
  import { getDifficultyToString, getTypeText } from "$lib/Activity/helper";
  import { truncate } from "$lib/Internals/Misc/helper";
  import { getStores, page } from "$app/stores";

  export let activities;
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
                Leerdoel
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Velden
              </th>
              <slot name="table-header" />
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each activities as activity, index}
              <tr>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    <a class="underline" href="/leerdoel/{activity.goalId}"
                      >{activity.goalTitle}</a
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {#if activity.type !== ""}
                      {getTypeText(activity.type)} <br />
                    {/if}
                    {#if activity.title}{activity.title}<br />{/if}
                    {#if activity.descriptionRaw}{@html truncate(
                        activity.descriptionRaw,
                        60
                      )}<br />{/if}
                    {#if activity.difficulty}{getDifficultyToString(
                        activity.difficulty
                      )}<br />{/if}
                    {#if activity.video.vimeoId}<a
                        class="underline"
                        href="https://vimeo.com/{activity.video.vimeoId}"
                        >vimeo.com/{activity.video.vimeoId}</a
                      ><br />{/if}
                  </div>
                </td>
                <slot
                  name="table-d"
                  connectionStatus={activity.connectionStatus}
                />
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="/activiteit/{activity.id}?redirect={$page.path}"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >Bekijken</a
                  >
                  <a
                    href="/lerarenkamer/activiteit/{activity.id}"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >Wijzigen</a
                  >
                  <slot
                    name="cta"
                    activityId={activity.id}
                    {index}
                    goalId={activity.goalId}
                    connectionId={activity.connectionId}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if activities.length === 0}
          <div class="m-4">
            Geen concept activiteiten gevonden. <a
              class="underline"
              href="/lerarenkamer/activiteit/maken-leerdoel-zoeken"
            >
              Je kan hier een activiteit maken</a
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
