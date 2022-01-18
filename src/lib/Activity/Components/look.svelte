<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { goto } from "$app/navigation";
  import { getStores, page } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  export let activity;
  export let firebase;

  let redirect;

  $: {
    redirect = $page.query.get("redirect");
  }

  function goBack() {
    if ($page.query.get("redirect")) {
      goto($page.query.get("redirect"));
    }
  }
</script>

{#if activity}
  <ShowActivity bind:firebase bind:activity showFeedback={false} />
{/if}

{#if redirect}
  <div class="mt-8 mb-32">
    <Button on:click={goBack} content="Terug" />
  </div>
{/if}
