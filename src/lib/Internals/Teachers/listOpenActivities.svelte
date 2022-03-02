<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { getStatusText } from "$lib/Goal/Connection/Components/helper";
  import { t } from "svelte-intl-precompile";
  export let activities = [];
</script>

<DataTableActivities
  bind:activities
  let:goalId
  let:connectionId
  let:connectionStatus
>
  <th
    slot="table-header"
    scope="col"
    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {$t("connection-status")}
  </th>

  <th
    slot="table-d"
    scope="col"
    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
  >
    {#if connectionStatus}
      {getStatusText(connectionStatus, $t)}
    {:else}
      {$t("unknown")}
    {/if}
  </th>
  <a
    slot="cta"
    href="/leerdoel/{goalId}/activiteiten/{connectionId}"
    class=" underline text-indigo-600 hover:text-indigo-900 text-right text-sm font-medium"
  >
    {$t("connection-with-goal")}
  </a>
</DataTableActivities>
