<script>
  import Transition from "svelte-class-transition";
  import Button from "../Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  export let time = 4000;
  export let displayNotification = false;
  export let notificationText = {
    title: "Title of notification",
    description: "Description of the notification",
  };

  let timeout;
  // let toggleNotification= false;

  $: if (displayNotification === true) {
    displayNotificationAndSetTimer();
  }

  function displayNotificationAndSetTimer() {
    // toggleNotification = true;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      // toggleNotification = false;
      displayNotification = false;
    }, time);
  }

  function closeToggle() {
    // toggleNotification = false;
    displayNotification = false;
    if (timeout) {
      clearTimeout(timeout);
    }
  }
</script>

<div
  aria-live="assertive"
  class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
>
  <div
    class="mx-auto max-w-7xl w-full flex flex-col items-center space-y-4 sm:items-end"
  >
    <Transition
      toggle={displayNotification}
      inTransition="transform ease-out duration-300 transition"
      inState="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      onState="translate-y-0 opacity-100 sm:translate-x-0"
      outTransition="transition ease-in duration-100"
      outState="opacity-0"
    >
      <div
        class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-400"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {notificationText.title}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {notificationText.description}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <Button
                on:click={closeToggle}
                color="whitePrimaryIcon"
                size="icon-square-small"
              >
                <span class="sr-only">{$t("close")}</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</div>
