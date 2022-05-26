<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { goto } from "$app/navigation";
  import { getStores, page } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  export let activity;
 

  let redirect;

  $: {
    redirect = $page.url.searchParams.get("redirect");
  }

  function goBack() {
    if ($page.url.searchParams.get("redirect")) {
      goto($page.url.searchParams.get("redirect"));
    }
  }
</script>

{#if activity}
  <ShowActivity  bind:activity showFeedback={false} />
{/if}

{#if redirect}
  <div class="mt-8 mb-32">
    <Button on:click={goBack} content="{$t("back")}" />
  </div>
{/if}
