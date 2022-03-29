<script>
  import Dialog from "$lib/Internals/Misc/Dialog.svelte";
  import { t } from "svelte-intl-precompile";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { createEventDispatcher } from "svelte";
  export let toggle;
  export let link;
  const dispatch = createEventDispatcher();

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
  <div
    class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
  >
    <div>
      <div
        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
      >
        <svg
          class="h-6 w-6 text-green-600"
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3
          class="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          {$t("trust-website")} <br />
          <b>{link}</b>
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            {$t("trust-website-text")}
          </p>
        </div>
      </div>
    </div>
    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
    >
      <Button content={$t("cancel")} on:click={cancelDialog} />
      <Button
        content={$t("take-me-to-website")}
        color="primary"
        on:click={dialogOkEvent}
      />
    </div>
  </div>
</Dialog>
