<script>
  import UpdateContentSingleLine from "$lib/Update/Components/UpdateContentSingleLine.svelte";
  import RemovedIcon from "$lib/Update/Icons/RemovedIcon.svelte";
  import { t } from "svelte-intl-precompile";

  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
</script>

<UpdateContentSingleLine bind:i bind:feedLength bind:update bind:showConnectionInfo>
  <svelte:fragment slot="icon">
    <RemovedIcon />
  </svelte:fragment>
  {$t("activity-removed-connection-archived")} - {#if update.createdAtTimeAgo}
    {update.createdAtTimeAgo}
  {/if}
</UpdateContentSingleLine>
