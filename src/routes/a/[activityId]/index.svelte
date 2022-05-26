<script>
  import StandaloneViewActivity from "$lib/Activity/Components/StandaloneView.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import { t } from "svelte-intl-precompile";

  ;
  let activity;
  let mounted;
</script>

<GetActivityData  bind:activity bind:mounted />
{#if activity}
  <StandaloneViewActivity  bind:activity />
{:else if !mounted}
  {$t("loading")}
{:else}
  {$t("activity-not-found")}
{/if}
