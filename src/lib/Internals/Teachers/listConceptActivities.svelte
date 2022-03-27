<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { getDefaultAlertValues, truncate } from "$lib/Internals/Misc/helper";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import Button from "$lib/Internals//Button/Button.svelte";
  import RemoveDialog from "$lib/Internals/Misc/RemoveDialog.svelte";
  import { t } from "svelte-intl-precompile";
  import ShareDialog from "$lib/Activity/Components/ShareDialog.svelte";
  let deleteActivityToggle = false;
  export let firebase;

  export let activities = [];
  let activityDeleteId = null;
  let activityDeleteIndex = null;

  function toggleDeleteActivity(activityId, index) {
    activityDeleteId = activityId;
    activityDeleteIndex = index;
    deleteActivityToggle = true;
  }

  function cancelDelete() {
    activityDeleteId = null;
    activityDeleteIndex = null;
  }
  let alert = getDefaultAlertValues();

  async function removeDraft() {
    if (activityDeleteId !== null && activityDeleteIndex !== null) {
      let db = await firebase.firestore();
      try {
        await db.collection("activities").doc(activityDeleteId).delete();
        alert.successTitle = $t("concept-removed");
        alert.successMessage = "";
        alert.success = true;
        activities.splice(activityDeleteIndex, 1);
        activities = activities;
      } catch (error) {
        console.log(error);
        alert.errorMessage = $t("error-while-removing");
        alert.error = true;
      }
    }
  }

  let dialogActivityId;
  let shareToggle = false;

  function toggleShare(activityId) {
    dialogActivityId = activityId;
    console.log(dialogActivityId);
    shareToggle = true;
  }
</script>

<ShareDialog bind:activityId={dialogActivityId} bind:toggle={shareToggle} />


<ResultFeedback bind:alert />

<RemoveDialog
  bind:toggle={deleteActivityToggle}
  on:ok={removeDraft}
  on:cancel={cancelDelete}
/>

<DataTableActivities bind:activities let:activityId let:index>
  <span slot="cta" let:activityId>
    <Button
      content={$t("share")}
      color="primary"
      size="very-small"
      on:click={() => toggleShare(activityId)}
    />
    <Button
      color="lightRed"
      size="tiny"
      content={$t("removing")}
      on:click={() => toggleDeleteActivity(activityId, index)}
    />
  </span>
</DataTableActivities>
