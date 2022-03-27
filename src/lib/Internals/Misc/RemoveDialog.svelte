<script>
  import Dialog from "$lib/Internals/Misc/Dialog.svelte";
  import { t } from "svelte-intl-precompile";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let toggle = false;

  function dialogOkEvent() {
    toggle = false;
    dispatch("ok");
  }

  function cancelDialog() {
    toggle = false;
    dispatch("cancel");
  }
</script>

<Dialog bind:toggle>
  <div class="sm:flex sm:items-start">
    <div
      class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
    >
      <svg
        class="h-6 w-6 text-red-600"
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
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
        {$t("confirm-delete")}
      </h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500">{$t("are-you-sure")}</p>
      </div>
    </div>
  </div>
  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <Button
      on:click={dialogOkEvent}
      color="warning"
      content={$t("delete")}
      size="large"
    />
    <div class="ml-4"/>
    <Button
      on:click={cancelDialog}
      content={$t("cancel")}
      size="large"
    />
  </div>
</Dialog>
