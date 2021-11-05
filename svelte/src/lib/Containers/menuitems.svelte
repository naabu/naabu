<script>
  export let menuitems;
</script>

{#each menuitems as menuitem}
  <a
    href={menuitem.url}
    class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    class:bg-gray-100={menuitem.selected}
    class:text-gray-900={menuitem.selected}
    class:text-gray-600={!menuitem.selected}
    class:hover:bg-gray-50={!menuitem.selected}
    class:hover:text-gray-900={!menuitem.selected}
  >
    {#if menuitem.icon === "dashboard"}
      <svg
        class="mr-4 flex-shrink-0 h-6 w-6"
        class:text-gray-500={menuitem.selected}
        class:text-gray-400={!menuitem.selected}
        class:group-hover:text-gray-500={!menuitem.selected}
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    {:else if menuitem.icon === "people"}
      <svg
        class="mr-4 flex-shrink-0 h-6 w-6"
        class:text-gray-500={menuitem.selected}
        class:text-gray-400={!menuitem.selected}
        class:group-hover:text-gray-500={!menuitem.selected}
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    {:else if menuitem.icon === "progress"}
      <svg
        class="mr-4 flex-shrink-0 h-6 w-6"
        class:text-gray-500={menuitem.selected}
        class:text-gray-400={!menuitem.selected}
        class:group-hover:text-gray-500={!menuitem.selected}
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
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    {:else if menuitem.icon === "document"}
      <svg
        class="mr-4 flex-shrink-0 h-6 w-6"
        class:text-gray-500={menuitem.selected}
        class:text-gray-400={!menuitem.selected}
        class:group-hover:text-gray-500={!menuitem.selected}
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
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    {:else if menuitem.icon === "calendar"}
      <svg
        class="mr-4 flex-shrink-0 h-6 w-6"
        class:text-gray-500={menuitem.selected}
        class:text-gray-400={!menuitem.selected}
        class:group-hover:text-gray-500={!menuitem.selected}
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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    {/if}
    {menuitem.name}
  </a>
{/each}
