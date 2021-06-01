<script>
  import Transition from 'svelte-class-transition';
  import { getStores } from "$app/stores"
  const { session, page } = getStores();

  export let breadcrumbs = [];
  let toggleNotification= false;
  let timeout;

  function closeToggle() {
    toggleNotification = false;
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  function copyLinkToClipboard(url) {
    let clipboardUrl = url;
    if ($session.environment === 'development')
    {
      clipboardUrl = "http://localhost:3000" + url;
    }
    else if ($session.environment === 'acceptance') {
      clipboardUrl = "https://expwis.web.app" + url;
    }
    else if ($session.environment === 'production') {
      clipboardUrl = "TODO: Add production environment to Breadcrumb/show.svelte" + url;
    }
    navigator.clipboard.writeText(clipboardUrl);
    toggleNotification = true;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      toggleNotification = false;
    }, 4000);
  }

  function copyLastBreadCrumb(url, i) {
    if (i === breadcrumbs.length -1) {
      copyLinkToClipboard(url);
    }
  }
</script>

<div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
  <div class="mx-auto max-w-7xl w-full flex flex-col items-center space-y-4 sm:items-end">
    <Transition
      toggle={toggleNotification}
      inTransition="transform ease-out duration-300 transition" 
      inState="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      onState="translate-y-0 opacity-100 sm:translate-x-0"
      outTransition="transition ease-in duration-100"
      outState="opacity-0"
    >
      <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                Link succesvol gekopieerd!
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Je kan de link naar een andere moderator sturen
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button on:click={closeToggle} class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</div>



{#if breadcrumbs.length > 1}
  <nav class="sm:hidden" aria-label="Back">
    <a
      href="{ breadcrumbs[breadcrumbs.length-2].url }"
      class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
    >
      <svg
        class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      Back
    </a>
  </nav>
{:else if breadcrumbs.length == 1}
  <nav class="sm:hidden">
    <div>
      <a on:click={() => copyLinkToClipboard(breadcrumbs[0].url)}
        href="{breadcrumbs[0].url}"
        class="text-sm font-medium text-gray-400 hover:text-gray-200"
        >  {breadcrumbs[0].value}</a
      >
    </div>
  </nav>
{/if}

<nav class="hidden sm:flex" aria-label="Breadcrumb">
  <ol class="flex items-center space-x-4">
    {#each breadcrumbs as breadcrumb, i}
      {#if i == 0}
        <div>
          <a
            on:click={() => copyLastBreadCrumb(breadcrumb.url, i)}
            href="{breadcrumb.url}"
            class="text-sm font-medium text-gray-400 hover:text-gray-200"
            >  {breadcrumb.value}</a
          >
        </div>
      {:else}
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        <a
          on:click={() => copyLastBreadCrumb(breadcrumb.url, i)}
          href="{breadcrumb.url}"
          class="text-sm font-medium text-gray-400 hover:text-gray-200"
          >  {breadcrumb.value}</a>
        </div>
      {/if}
    {/each}
  </ol>
</nav>
