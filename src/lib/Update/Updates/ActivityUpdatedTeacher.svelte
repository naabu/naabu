<script>
  import UpdateContentMultiLine from "$lib/Update/Components/UpdateContentMultiLine.svelte";
  import UpdatedIcon from "$lib/Update/Icons/UpdatedIcon.svelte";
  import { t } from "svelte-intl-precompile";
  import ShowUpdateDifferences from "$lib/Update/Components/ShowUpdateDifferences.svelte";
  import { getActivitySort, getDifferencesBetweenRevisions } from "$lib/Internals/Revision/helper";

  export let updates;
  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
  let sortListOrder = getActivitySort();

  $: if (update.activity) {
    let previousActivity = {};
    for(let i2 = i-1; i2 >= 0 ; i2--) {
      if (updates[i2].type === "created-activity-teacher" || updates[i2].type === "activity-updated-teacher") {
        previousActivity = updates[i2].activity
        break;  
      }
    }
    update.differences = getDifferencesBetweenRevisions(
      previousActivity,
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
    <UpdatedIcon />
  </svelte:fragment>
  <svelte:fragment slot="aftername">
    - {$t("teacher")}
  </svelte:fragment>
  {$t("activity-updated")}
  <ShowUpdateDifferences bind:update />
</UpdateContentMultiLine>
