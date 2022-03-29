<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { getStatusText } from "$lib/Goal/Connection/Components/helper";
  import { t } from "svelte-intl-precompile";
  import ShareDialog from "$lib/Activity/Components/ShareDialog.svelte";
  import Button from "$lib/Internals//Button/Button.svelte";

  export let activities = [];
  let dialogActivityId;
  let shareToggle = false;

  function toggleShare(activityId) {
    dialogActivityId = activityId;
    shareToggle = true;
  }
</script>

<ShareDialog bind:activityId={dialogActivityId} bind:toggle={shareToggle} />

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

  <svelte:fragment slot="cta" let:activityId>
    <a
      href="/leerdoel/{goalId}/activiteiten/{connectionId}"
      class=" underline text-indigo-600 hover:text-indigo-900 text-right text-sm font-medium"
    >
      {$t("connection-with-goal")}
    </a>
    <Button
      content={$t("share")}
      color="primary"
      size="very-small"
      on:click={() => toggleShare(activityId)}
    />
  </svelte:fragment>
</DataTableActivities>
