<script>
  import { formatToTimeAgo, formatToTimeLeft } from "$lib/Internals/Misc/helper";
  import { sortOnCreatedAt } from "$lib/Internals/Revision/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  export let firebase;
  export let connectionArray;
  export let goal;
  export let linkType;
  let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  let daysToSendToNeedsWork = 3 * 86400;

  function compareTimeInFutureNeedsWork(a, b) {
    if (a.timeInFutureToNeedsWork < b.timeInFutureToNeedsWork) {
      return -1;
    }
    if (a.timeInFutureToNeedsWork > b.timeInFutureToNeedsWork) {
      return 1;
    }
    return 0;
  }

  $: {
    connectionArray.sort(compareTimeInFutureNeedsWork);
  }

  $: {
    for (let i = 0; i < connectionArray.length; i++) {
      let connection = connectionArray[i];
      connection.timeInFutureToNeedsWork =
        connection.inNeedsForApprovalAt + daysToSendToNeedsWork;
    }
  }

  function setServerTimeInFunction() {
    serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  }

  setInterval(setServerTimeInFunction, 5000);

  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");
</script>

{#if connectionArray && connectionArray.length > 0}
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
                  Gewijzigd op
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Laatste update
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tijd over om goed te keuren
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each connectionArray as connection}
                <tr>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {connection.title}
                    </div>
                  </td>
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
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/leerdoel/{goal.id}/{linkType}/{connection.id}"
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
