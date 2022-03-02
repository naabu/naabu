<script>
  import ArrayDiff from "$lib/Internals/Revision/ArrayDiff.svelte";
  import StringDiff from "$lib/Internals/Revision/StringDiff.svelte";
  import { goto } from "$app/navigation";
  import { t } from "svelte-intl-precompile";
  import { formatActivityKeys, formatActivityValue, getActivitySort, getDifferencesBetweenRevisions } from "$lib/Internals/Revision/helper";
  export let revisionOld;
  export let revisionNew;
  export let loading = false;
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
        titleTranslationKey={difference.keys[difference.keys.length - 1]}
        title={formatActivityKeys(difference.keys, $t)}
        old={formatActivityValue(difference, difference.oldValue, $t)}
        neww={formatActivityValue(difference, difference.newValue, $t)}
      />
    {:else if difference.type === "array"}
      <ArrayDiff
        title={formatActivityKeys(difference.key, $t)}
        bind:old={difference.oldValue}
        bind:neww={difference.newValue}
      />
    {/if}
  {/each}
{:else}
  <div class="mt-4">{$t("loading")}</div>
{/if}
