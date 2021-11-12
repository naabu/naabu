<script>
  import LookAtActivity from "$lib/Activity/look.svelte";

  import GetActivityData from "$lib/Activity/getActivityData.svelte";

  let firebase;
  let activity;
</script>

<GetActivityData bind:firebase bind:activity />
{#if activity}
  <LookAtActivity bind:firebase bind:activity />
{:else}
  Loading...
{/if}
