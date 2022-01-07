<script>
  import ArrayDiff from "$lib/Internals/Diff/arrayDiff.svelte";
  import StringDiff from "$lib/Internals/Diff/stringDiff.svelte";
  import { goto } from "$app/navigation";
  import { formatActivityKeys, formatActivityValue, getActivitySort, getDifferencesBetweenRevisions } from "$lib/Internals/Revision/helper";
  export let revisionOld;
  export let revisionNew;
  export let loading = false;
  export let differences = [];
  let orderedDifference;
  let sortListOrder = getActivitySort();

  $: if (revisionOld && revisionNew) {
    orderedDifference = getDifferencesBetweenRevisions(revisionOld, revisionNew, sortListOrder);
  }
</script>

{#if !loading}
  {#each orderedDifference as difference}
    {#if difference.type === "string"}
      <StringDiff
        title={formatActivityKeys(difference.keys)}
        old={formatActivityValue(difference, difference.oldValue)}
        neww={formatActivityValue(difference, difference.newValue)}
      />
    {:else if difference.type === "array"}
      <ArrayDiff
        title={formatActivityKeys(difference.key)}
        bind:old={difference.oldValue}
        bind:neww={difference.newValue}
      />
    {/if}
  {/each}
{:else}
  <div class="mt-4">Loading...</div>
{/if}
