<script>
  import LookAtActivity from "$lib/Activity/Components/look.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import { t } from "svelte-intl-precompile";

 
  let activity;
</script>

<GetActivityData  bind:activity />
{#if activity}
  <LookAtActivity  bind:activity />
{:else}
{$t("loading")}
{/if}
