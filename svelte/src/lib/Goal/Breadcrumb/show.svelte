<script>
  import { getStores, session } from "$app/stores"
  import Notification from "$lib/Misc/notification.svelte";

  export let breadcrumbs = [];
  let displayNotification = false;
  let notificationText = {
    title: "Link succesvol gekopieerd!",
    description: "Je kan nu de link naar een iemand sturen",
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
    displayNotification = true;
  }

  function copyLastBreadCrumb(url, i) {
    if (i === breadcrumbs.length -1) {
      copyLinkToClipboard(url);
    }
  }
</script>

<Notification bind:displayNotification bind:notificationText time=4000 />

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
