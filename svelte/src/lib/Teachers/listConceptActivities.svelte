<script>
  import DataTableActivities from "$lib/Teachers/dataTableActivities.svelte";
  import { getDefaultAlertValues, truncate } from "$lib/Misc/helper";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  export let firebase;

  export let activities = [];

  let alert = getDefaultAlertValues();

  async function removeDraft(activityId, index) {
    let db = await firebase.firestore();
    try {
      await db.collection("activities").doc(activityId).delete();
      alert.successTitle = "Concept verwijderd";
      alert.successMessage = "";
      alert.success = true;
      activities.splice(index, 1);
      activities = activities;
    } catch (error) {
      console.log(error);
      alert.errorMessage = "Error met het verwijderen van";
      alert.error = true;
    }
  }
</script>

<ResultFeedback bind:alert />

<DataTableActivities bind:activities let:activityId let:index>
  <button
    slot="cta"
    on:click={() => removeDraft(activityId, index)}
    class="text-indigo-600 hover:text-indigo-900 text-right text-sm font-medium"
  >
    Verwijderen
  </button>
</DataTableActivities>
