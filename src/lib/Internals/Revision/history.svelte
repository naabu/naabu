<script>
  import { getDateString } from "$lib/Internals/Misc/helper";
  export let revisions;
  import { formatToTimeAgo } from "$lib/Internals/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import Transition from "svelte-class-transition";

  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");
  export let firebase;
  export let toggle = true;
  export let activeRevisionId;

</script>

<div class="fixed inset-y-16 right-0 pl-10 max-w-full flex z-20">
  <Transition
    {toggle}
    inTransition="transform transition ease-in-out duration-500 sm:duration-700"
    inState="translate-x-full"
    onState="translate-x-0"
    outTransition="transform transition ease-in-out duration-500 sm:duration-700"
    outState="translate-x-full"
  >
    <div class="w-screen max-w-md">
      <div
        class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
              Wijzigingen
            </h2>
            <div class="ml-3 h-7 flex items-center">
              <button
                type="button"
                on:click={() => {
                  toggle = !toggle;
                }}
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
          {#each revisions as revision, i}
            {#if revision.previousRevisionId}
              <a
                data-test="revision-link-{i}"
                href="/revisie/{revision.revisionId}/diff/{revision.previousRevisionId}"
                class="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                class:bg-gray-50={revision.revisionId === activeRevisionId}
                on:click={() => {
                  toggle = !toggle;
                }}
              >
                <p class="text-base font-medium text-gray-900">
                  {formatToTimeAgo(
                    revision.revisionCreatedAt,
                    firebase,
                    timeAgo
                  )}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  bekijk wijzigingen - {revision.revisionId}
                </p>
              </a>
            {:else}
              <a
                data-test="revision-link-{i}"
                href="/revisie/{revision.revisionId}/diff"
                class="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                class:bg-gray-50={revision.revisionId === activeRevisionId}
                on:click={() => {
                  toggle = !toggle;
                }}
              >
                <p class="text-base font-medium text-gray-900">
                  {formatToTimeAgo(
                    revision.revisionCreatedAt,
                    firebase,
                    timeAgo
                  )}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  bekijk wijzigingen - {revision.revisionId}
                </p>
              </a>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </Transition>
</div>
