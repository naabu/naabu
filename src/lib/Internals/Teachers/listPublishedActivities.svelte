<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { t } from "svelte-intl-precompile";
  import Button from "$lib/Internals//Button/Button.svelte";
  import ShareDialog from "$lib/Activity/Components/ShareDialog.svelte";
  export let activities = [];
  let dialogActivityId;
  let shareToggle = false;

  function toggleShare(activityId) {
    dialogActivityId = activityId;
    shareToggle = true;
  }
</script>

<ShareDialog bind:activityId={dialogActivityId} bind:toggle={shareToggle} />

<DataTableActivities bind:activities let:goalId let:connectionId>
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
