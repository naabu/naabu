<script>
  import Dialog from "$lib/Internals/Misc/Dialog.svelte";
  import { getStores, page } from "$app/stores";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Notification from "$lib/Internals/Misc/notification.svelte";
  export let activityId;

  let externalLink = "";
  let link = "";
  let displayNotification = false;
  let notificationText = {
    title: $t("link-copy-success"),
    description: $t("send-link-message"),
  };

  $: {
    link = $page.url.origin + "/a/" + activityId;
    if (externalLink.length > 0) {
      if (
        !externalLink.startsWith("http://") &&
        !externalLink.startsWith("https://")
      ) {
        link += "?link=" + "https://" + externalLink;
      } else {
        link += "?link=" + externalLink;
      }
    }
  }
  export let toggle;

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(link);
    displayNotification = true;
    toggle = false;
  }
</script>

<Notification bind:displayNotification bind:notificationText time="4000" />


<Dialog bind:toggle>
  <div class="flex justify-between">
    <h3
      class="mt-2 text-lg leading-6 font-medium text-gray-900"
      id="modal-title"
    >
      {$t("share")}
    </h3>
    <Button
      on:click={() => (toggle = false)}
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

  <FormField title={$t("external-website")} labelPosition="top">
    <TextInput bind:value={externalLink} />
    <AdditionalFormText content={$t("external-website-explanation")} />
  </FormField>
  <FormField title={$t("share-link")} labelPosition="top">
    <div class="flex justify-start">
      <TextInput bind:value={link} disabled={true} />
      <div class="ml-2">
        <Button
          size="large"
          color="primary"
          content={$t("copy")}
          on:click={copyLinkToClipboard}
        />
      </div>
    </div>
  </FormField>
</Dialog>
