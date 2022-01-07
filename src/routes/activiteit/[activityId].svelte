<script>
  import LookAtActivity from "$lib/Activity/Components/look.svelte";

  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";

  let firebase;
  let activity;
</script>

<GetActivityData bind:firebase bind:activity />
{#if activity}
  <LookAtActivity bind:firebase bind:activity />
{:else}
  Loading...
{/if}
