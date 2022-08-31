<script>
  import { getDiffStrings } from "$lib/Internals/Misc/helper";
  import sanitizeHtml from 'sanitize-html';
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
            {@html sanitizeHtml
(
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
