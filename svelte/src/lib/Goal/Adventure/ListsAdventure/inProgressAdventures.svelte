<script>
  export let goal;
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/adventureStatus.svelte";
  import DataTable from "./datatable.svelte";
  export let firebase;
  import { formatToTimeAgo, formatToTimeLeft } from "$lib/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  export let adventureArray;
  let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  let daysToSendToApproval = 2 * 86400;

  function compareTimeLeftToApprove(a, b) {
    if (a.timeInFutureToApprove < b.timeInFutureToApprove) {
      return -1;
    }
    if (a.timeInFutureToApprove > b.timeInFutureToApprove) {
      return 1;
    }
    return 0;
  }

  $: {
    adventureArray = goal.inProgressAdventures;
    adventureArray.sort(compareTimeLeftToApprove);
  }

  $: {
    for (let i = 0; i < adventureArray.length; i++) {
      let adventure = adventureArray[i];
      adventure.timeInFutureToApprove =
        adventure.inProgressAt + daysToSendToApproval;
    }
  }

  function setServerTimeInFunction() {
    serverTimestamp = firebase.firestore.Timestamp.now().seconds;
  }

  setInterval(setServerTimeInFunction, 5000);

  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");
</script>

<MainTabs bind:goal mainSelected="adventures" />
<SecondTabs bind:goal mainSelected="in-progress" />

<!-- <DataTable bind:goalId={goal.id} bind:adventureArray={goal.inProgressAdventures} bind:firebase/> -->
<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="/leerdoel/{goal.id}/avontuur-maken"> Nieuw advontuur maken</a>
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
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tijd tot goedkeuring
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
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {formatToTimeLeft(
                        serverTimestamp,
                        adventure.timeInFutureToApprove,
                        firebase,
                        timeAgo
                      )}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      href="/leerdoel/{goal.id}/avontuur/{adventure.id}/work"
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
