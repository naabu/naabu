<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { goto } from "$app/navigation";
  import { getStores, page } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  import ConfirmExternalLinkDialog from "./ConfirmExternalLinkDialog.svelte";
  import { t } from "svelte-intl-precompile";
  export let activity;

  let pluginFinished;
  let link;
  let confirmToggle = false;

  $: {
    link = $page.url.searchParams.get("link");
  }

  function goTolink() {
    if (link) {
      goto(link);
    }
  }
</script>

Hello Twitch!

{#if activity}
  <ShowActivity
    bind:activity
    showFeedback={false}
    bind:pluginFinished
  />
{/if}

<ConfirmExternalLinkDialog bind:link bind:toggle={confirmToggle} on:ok={goTolink} />

{#if link}
  <div class="flex justify-end mt-8 mb-32">
    <Button
      isDisabled={!pluginFinished}
      color="primary"
      on:click={() => (confirmToggle = true)}
      content={$t("to-external-link")}
    />
  </div>
{/if}
