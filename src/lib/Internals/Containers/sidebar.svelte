<script>
  import ShowMenuItems from "$lib/Internals/Containers/menuitems.svelte";
  import Transition from "svelte-class-transition";
  import Button from "../Button/Button.svelte";

  export let menuitems = [];
  let openSidebarMenu;
  $: if (menuitems) {
    openSidebarMenu = false;
  }
</script>

<div>
  <div class="">
    <div
      class="absolute inset-x-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white"
    >
      <Button
        on:click={() => (openSidebarMenu = true)}
        color="whitePrimaryIcon"
        size="icon-square"
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
      </Button>
    </div>
    <div
      class="fixed inset-x-0 z-40 flex md:hidden"
      role="dialog"
      aria-modal="true"
    >
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
            <div class="absolute top-0 right-0 -mr-12 pt-2 ml-1">
              <Button
                color="whiteFullIcon"
                size="icon-round"
                extraClasses={["ml-1"]}
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
              </Button>
            </div>
          </Transition>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <ShowMenuItems bind:menuitems />
            </nav>
          </div>
        </div>

        <div class="flex-shrink-0 w-14" />
      </Transition>
    </div>
    <div
      class="inset-x-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white h-10"
    />
  </div>

  <div class="flex">
    <div class="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
      <div
        class="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto"
      >
        <div class="flex-grow mt-5 flex flex-col">
          <nav
            data-test="desktop-sidebar-menu"
            class="flex-1 px-2 pb-4 space-y-1"
          >
            <ShowMenuItems bind:menuitems />
          </nav>
        </div>
      </div>
    </div>

    <div class="py-6 w-full">
      <slot name="cta-button" />

      <main class="w-full">
        <slot name="before" />
        <div class="py-6">
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
