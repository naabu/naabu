<script>
  import UpdateContentMultiLine from "$lib/Update/Components/UpdateContentMultiLine.svelte";
  import CreatedIcon from "$lib/Update/Icons/CreatedIcon.svelte";
  import { t } from "svelte-intl-precompile";
  import ShowUpdateDifferences from "$lib/Update/Components/ShowUpdateDifferences.svelte";
  import {
    getActivitySort,
    getDifferencesBetweenRevisions,
  } from "$lib/Internals/Revision/helper";

  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
  let sortListOrder = getActivitySort();

  $: if (update.activity) {
    update.differences = getDifferencesBetweenRevisions(
      {},
      update.activity,
      sortListOrder
    );
  }
</script>

<UpdateContentMultiLine
  bind:i
  bind:feedLength
  bind:update
  bind:showConnectionInfo
>
  <svelte:fragment slot="icon">
    <CreatedIcon />
  </svelte:fragment>
  <svelte:fragment slot="aftername">
    - {$t("teacher")}
  </svelte:fragment>
  {$t("activity-connected-to-goal")}
  {#if update.differences}
    <ShowUpdateDifferences bind:update />
  {/if}
</UpdateContentMultiLine>
