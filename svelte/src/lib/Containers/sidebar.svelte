<script>
  import ShowMenuItems from "$lib/Containers/menuitems.svelte";
  import Transition from "svelte-class-transition";

  export let menuitems = [];
  let openSidebarMenu;
  $: if (menuitems) {
    openSidebarMenu = false;
  }
</script>

<div>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div class="">
    <div
      class="absolute inset-x-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white"
    >
      <button
        type="button"
        class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        on:click={() => (openSidebarMenu = true)}
      >
        <span class="sr-only">Open sidebar</span>
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <div
      class="fixed inset-x-0 z-40 flex md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <!--Off-canvas menu overlay, show/hide based on off-canvas menu state. -->
      <Transition
        toggle={openSidebarMenu}
        inTransition="transition-opacity ease-linear duration-300"
        inState="opacity-0"
        onState="opacity-100"
        outTransition="transition-opacity ease-linear duration-300"
        outState="opacity-0"
      />
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />
      <Transition
        toggle={openSidebarMenu}
        inTransition="transition ease-in-out duration-300 transform"
        inState="-translate-x-full"
        onState="translate-x-0"
        outTransition="transition ease-in-out duration-300 transform"
        outState="-translate-x-full"
      >
        <div
          class="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col"
        >
          <Transition
            toggle={openSidebarMenu}
            inTransition="ease-in-out duration-300"
            inState="opacity-0"
            onState="opacity-100"
            outTransition="ease-in-out duration-300"
            outState="opacity-0"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                on:click={() => (openSidebarMenu = false)}
              >
                <span class="sr-only">Close sidebar</span>
                <svg
                  class="h-6 w-6 text-white"
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
          </Transition>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <ShowMenuItems bind:menuitems />
            </nav>
          </div>
        </div>

        <div class="flex-shrink-0 w-14">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Transition>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div class="flex">
    <div class="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto"
      >
        <div class="flex-grow mt-5 flex flex-col">
          <nav class="flex-1 px-2 pb-4 space-y-1">
            <ShowMenuItems bind:menuitems />
          </nav>
        </div>
      </div>
    </div>
    <!-- End of menu items -->

    <div class="py-6 w-full">
      <slot name="cta-button" />

      <main class="w-full">
        <slot name="abovetitle" />
        <div class="py-6">
          <!-- <div class="px-4 sm:px-6 md:px-0">
            <h1 class="text-2xl font-semibold text-gray-900">
              <slot name="title">Dashboard</slot>
            </h1>
          </div> -->
          <div class="md:pl-4 sm:flex sm:justify-between sm:items-baseline">
            <div class="sm:w-0 sm:flex-1">
              <h1 class="text-2xl font-semibold text-gray-900">
                <slot name="title">Dashboard</slot>
              </h1>
            </div>
            <div
              class="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start"
            >
              <slot name="status" />
            </div>
          </div>
          <div class="md:pl-4">
            <div class="py-4">
              <slot name="content">
                <div
                  class="h-96 border-4 border-dashed border-gray-200 rounded-lg"
                />
              </slot>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
