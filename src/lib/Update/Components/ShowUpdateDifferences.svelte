<script>
  import { getDiffStrings } from "$lib/Internals/Misc/helper";
 import DOMPurify from 'dompurify';
  import { t } from "svelte-intl-precompile";

  import {
    formatActivityKeys,
    formatActivityValue,
  } from "$lib/Internals/Revision/helper";

  export let update;
</script>

<div>
  {#if update.differences}
    {#each update.differences as difference}
      {#if difference.type === "string"}
        <div class="text-gray-900">
          <div>
            {formatActivityKeys(difference.keys, $t)}
            {@html DOMPurify.sanitize(
              getDiffStrings(
                "" + formatActivityValue(difference, difference.oldValue, $t),
                "" + formatActivityValue(difference, difference.newValue, $t)
              )
            )}
          </div>
        </div>
      {/if}
    {/each}
  {/if}
</div>
