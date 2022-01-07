<script>
  import Preview from "$lib/Activity/Components/preview.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";

  let firebase;
  let activity;
  let showActivity;

  $: if (activity) {
    showActivity = JSON.parse(JSON.stringify(activity));
  }
</script>

<GetActivityData bind:firebase bind:activity />
{#if activity}
  <Preview bind:firebase {showActivity} bind:activity />
{:else}
  Loading...
{/if}
