<script>
  import Preview from "$lib/Activity/Components/preview.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import { t } from "svelte-intl-precompile";

  ;
  let activity;
  let showActivity;
</script>

<GetActivityData
  
  bind:activity
  bind:cloneActivity={showActivity}
/>
{#if activity}
  <Preview  {showActivity} bind:activity />
{:else}
  {$t("loading")}
{/if}
