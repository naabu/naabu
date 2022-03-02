<script>
  import { getStores, page } from "$app/stores";
  import Button from "../Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  export let alert = {
    success: false,
    successTitle: "",
    successMessage: "",
    error: false,
    errorCode: "",
    errorMessage: "",
  };
</script>

{#if alert.success}
  <div class="rounded-md bg-green-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <h3
          data-test="alert-success-title"
          class="text-sm font-medium text-green-800"
        >
          {alert.successTitle}
        </h3>
        <div class="mt-2 text-sm text-green-700">
          <p>
            {alert.successMessage}
          </p>
        </div>
        <div class="mt-4">
          <div class="-mx-2 -my-1.5 flex">
            <Button
              on:click={() => (alert.success = false)}
              size="very-small"
              content="Sluiten"
              color="greenAlert"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
{:else if alert.error && alert.errorCode == "permission-denied"}
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">{$t("no-permission")}</h3>
        <div class="mt-2 text-sm text-red-700">
          <p>{$t("forgot-to-login-message")}</p>
          <p>
            {alert.errorMessage}
          </p>
        </div>
      </div>
    </div>
  </div>
{:else if alert.error}
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          {$t("there-went-something-wrong")} = {alert.errorCode}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <p>
            {alert.errorMessage}
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}
