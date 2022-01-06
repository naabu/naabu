<script>
  export let connections;
  import { formatToTimeAgo, formatToTimeLeft } from "$lib/Internals/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import {
    compareTimeLeftToApprove,
    compareTimeLeftToNeedsWork,
    compareTimeLeftToTrash,
  } from "$lib/Goal/Connection/helper";
  export let firebase;
  export let goalId;
  export let urlType;
  export let status;
  let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  let daysToSendToTrash = 100 * 86400;
  let daysToSendToApproval = 2 * 86400;
  let daysToSendToNeedsWork = 3 * 86400;

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

  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");
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
                  Titel
                </th>
                <slot name="tableHeader" />

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
                {#if status === "needs-work"}
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tijd tot prullenbak
                  </th>
                {:else if status === "in-progress"}
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tijd tot goedkeuring
                  </th>
                {:else if status === "needs-approval"}
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tijd over om goed te keuren
                  </th>
                {/if}

                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
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
                        timeAgo
                      )}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {formatToTimeAgo(
                        connection.lastUpdatesAt,
                        firebase,
                        timeAgo
                      )}
                    </div>
                  </td>
                  {#if status === "needs-work"}
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {formatToTimeLeft(
                          serverTimestamp,
                          connection.timeInFutureToTrash,
                          firebase,
                          timeAgo
                        )}
                      </div>
                    </td>
                  {:else if status === "in-progress"}
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {formatToTimeLeft(
                          serverTimestamp,
                          connection.timeInFutureToApprove,
                          firebase,
                          timeAgo
                        )}
                      </div>
                    </td>
                  {:else if status === "needs-approval"}
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {formatToTimeLeft(
                          serverTimestamp,
                          connection.timeInFutureToNeedsWork,
                          firebase,
                          timeAgo
                        )}
                      </div>
                    </td>
                  {/if}

                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/leerdoel/{goalId}/{urlType}/{connection.id}"
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
  Geen verbindingen gevonden
{/if}
