<script>
  export let connections;
  import {
    formatToTimeAgo,
    formatToTimeLeft,
  } from "$lib/Internals/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";

  import { t, locale } from "svelte-intl-precompile";
  import {
    compareTimeLeftToApprove,
    compareTimeLeftToNeedsWork,
    compareTimeLeftToTrash,
  } from "$lib/Goal/Connection/Components/helper";
  ;
  export let goalId;
  export let urlType;
  export let status;
  let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  let daysToSendToTrash = 100 * 86400;
  let daysToSendToApproval = 2 * 86400;
  let daysToSendToNeedsWork = 3 * 86400;

  $: if (connections) {
    for (let i = 0; i < connections.length; i++) {
      connections[i].connectionToLinkId = connections[i].linkId;
      if (connections[i].type === "goal-activity") {
        connections[i].connectionToLinkId = connections[i].id;
      }
    }
  }

  $: if (status === "needs-work") {
    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      connection.timeInFutureToTrash =
        connection.inNeedsWorkAt + daysToSendToTrash;
    }
    connections.sort(compareTimeLeftToTrash);
  }

  $: if (status === "in-progress") {
    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      connection.timeInFutureToApprove =
        connection.inProgressAt + daysToSendToApproval;
    }
    connections.sort(compareTimeLeftToApprove);
  }

  $: if (status === "needs-approval") {
    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      connection.timeInFutureToNeedsWork =
        connection.inNeedsForApprovalAt + daysToSendToNeedsWork;
    }
    connections.sort(compareTimeLeftToNeedsWork);
  }

  function setServerTimeInFunction() {
    serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  }

  setInterval(setServerTimeInFunction, 3000);

  TimeAgo.addLocale(en);
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo($locale);
</script>

<slot name="createButton" />

{#if connections && connections.length > 0}
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
                  {$t("title")}
                </th>
                <slot name="tableHeader" />

                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {$t("changed-on")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {$t("last-update")}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {$t("status")}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">{$t("edit")}</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each connections as connection}
                <tr>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {connection.title}
                    </div>
                  </td>
                  <slot name="tableD" {connection} />
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {formatToTimeAgo(
                        connection.modifiedAt,
                        firebase,
                        timeAgo,
                        $t
                      )}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {formatToTimeAgo(
                        connection.lastUpdatesAt,
                        firebase,
                        timeAgo,
                        $t
                      )}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {$t(connection.status)}
                    </div>
                  </td>

                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/leerdoel/{goalId}/{urlType}/{connection.connectionToLinkId}"
                      class="text-indigo-600 hover:text-indigo-900"
                      >{$t("history")}</a
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
  <slot name="not-found">
    {$t("no-connection-found")}
  </slot>
{/if}
