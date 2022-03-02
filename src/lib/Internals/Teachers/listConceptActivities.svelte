<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { getDefaultAlertValues, truncate } from "$lib/Internals/Misc/helper";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import Button from "../Button/Button.svelte";
  import VerwijderDialog from "$lib/Internals/Misc/dialog.svelte";
  import { t } from "svelte-intl-precompile";
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
</script>

<ResultFeedback bind:alert />

<VerwijderDialog
  bind:toggle={deleteActivityToggle}
  on:ok={removeDraft}
  on:cancel={cancelDelete}
/>

<DataTableActivities bind:activities let:activityId let:index>
  <span slot="cta">
    <Button
      color="lightRed"
      size="tiny"
      content={$t("removing")}
      on:click={() => toggleDeleteActivity(activityId, index)}
    />
  </span>
</DataTableActivities>
