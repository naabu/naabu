<script>
  import Teaser from "$lib/Activity/Components/teaser.svelte";
  import { t } from "svelte-intl-precompile";
  export let activities = [];
  export let moduleId;
  export let locationId;
</script>

<h1 class="font-bold text-xl m-5">{$t("choose-your-path")}</h1>

<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {#each activities as activity, i}
    <span data-test="activity-teaser-{i}">
      <Teaser bind:activity bind:moduleId bind:locationId />
    </span>
  {/each}
  {#if activities.length === 0}
    <div class="flex flex-col mt-5">
      {$t("looking-for-best-activities")}
    </div>
  {/if}
</ul>
