<script>
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import { t } from "svelte-intl-precompile";
  export let breadcrumbs;
  export let activity;
  export let feedback;
</script>

<ShowBreadcrumb bind:breadcrumbs />
<div>
  <div class="mt-2 md:flex md:items-center md:justify-between">
    <div class="flex-1 min-w-0">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {$t("activity-dashboard-title")}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {$t("activity-dashboard-of-activity")}
          {#if activity}
            {activity.title}
          {/if}
        </p>
      </div>
    </div>
  </div>
</div>

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
                {$t("feedback-type")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("user-id")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("time")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("feedback-value")}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each feedback as fb}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {#if fb.feedbackType === "difficulty"}
                          {$t("difficulty")}
                        {/if}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-200">
                    <div class="text-sm font-medium text-gray-900">
                      {fb.uid}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {fb.dateString}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {#if fb.feedbackValue == 1}
                    {$t("just-right")}
                  {:else if fb.feedbackValue == -0.5}
                    {$t("too-easy")}
                  {:else if fb.feedbackValue == -1}
                    {$t("too-difficult")}
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
