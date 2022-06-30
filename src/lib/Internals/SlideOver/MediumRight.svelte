<script>
  import Transition from "svelte-class-transition";
  import { t } from "svelte-intl-precompile";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import { createEventDispatcher } from "svelte";

  export let toggle = false;

  const dispatch = createEventDispatcher();

  export let slideOverTitle = $t("default-slide-over-title");
  export let slideOverText = $t("default-slide-over-text");

  function closeSlideOver() {
    toggle = false;
    dispatch("closeSlideOver");
  }
</script>

<div class="fixed inset-y-0 right-0 max-w-3xl flex z-10">
  <Transition
    {toggle}
    inTransition="transform transition ease-in-out duration-500 sm:duration-700"
    inState="translate-x-full"
    onState="translate-x-0"
    outTransition="transform transition ease-in-out duration-500 sm:duration-700"
    outState="translate-x-full"
  >
    <div class="pointer-events-auto w-screen max-w-3xl">
      <div
        class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <div>
              <h2
                class="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                {slideOverTitle}
              </h2>
              <AdditionalFormText content={slideOverText} />
            </div>
            <div class="ml-3 flex h-7 items-center">
              <button
                type="button"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                on:click={closeSlideOver}
              >
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="relative mt-6 flex-1 px-4 sm:px-6">
          <slot>
            <div class="absolute inset-0 px-4 sm:px-6">
              <div
                class="h-full border-2 border-dashed border-gray-200"
                aria-hidden="true"
              />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</div>
