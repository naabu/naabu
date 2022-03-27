<script>
  import StandaloneViewActivity from "$lib/Activity/Components/StandaloneView.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import { t } from "svelte-intl-precompile";

  let firebase;
  let activity;
  let mounted;
</script>

<GetActivityData bind:firebase bind:activity bind:mounted />
{#if activity}
  <StandaloneViewActivity bind:firebase bind:activity />
{:else if !mounted}
  {$t("loading")}
{:else}
  {$t("activity-not-found")}
{/if}
