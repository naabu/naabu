<script>
  import Preview from "$lib/Activity/preview.svelte";
  import GetActivityData from "$lib/Activity/getActivityData.svelte";

  let firebase;
  let activity;
</script>

<GetActivityData bind:firebase bind:activity />
{#if activity}
  <Preview bind:firebase bind:activity />
{:else}
  Loading...
{/if}
