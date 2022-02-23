<script>
  import Preview from "$lib/Activity/Components/preview.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";

  let firebase;
  let activity;
  let showActivity;
</script>

<GetActivityData
  bind:firebase
  bind:activity
  bind:cloneActivity={showActivity}
/>
{#if activity}
  <Preview bind:firebase {showActivity} bind:activity />
{:else}
  Loading...
{/if}
