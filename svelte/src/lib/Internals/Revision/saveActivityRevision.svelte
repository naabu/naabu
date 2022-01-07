<script>
  import { goto } from "$app/navigation";
  import { getStores, session } from "$app/stores";
  import { getActivitySaveData } from "$lib/Activity/helper";
  import { createRevision } from "$lib/Internals/Revision/helper";

  export let revision;
  export let firebase;
  export let latestRevisionId;
  let activity;

  async function save() {
    let db = await firebase.firestore();
    if ($session.user) {
      let activityData = getActivitySaveData(activity);
      let resultRevision = await createRevision(
        firebase,
        activity,
        activityData,
        $session.user.uid
      );

      activityData.latestRevisionId = resultRevision.id;
      activityData.latestRevisionCreatedAt = firebase.firestore.Timestamp.now().seconds;

      if (activity.latestRevisionId) {
        activityData.previousRevisionId = activity.latestRevisionId;
      }

      activityData.authorId = $session.user.uid;
      delete activityData.status;
      let db = firebase.firestore();

      let ref = db.collection("activities").doc(activity.id);
      try {
        await ref.update(activityData);
        goto("/lerarenkamer/activiteit/" + activity.id);
      } catch (e) {
        console.error("Error adding documfent: ", e);
      }
    }
  }

  async function applyRevisionToActivity() {
    activity = revision;
    activity.id = revision.revisionSourceId;
    if (latestRevisionId) {
      activity.latestRevisionId = latestRevisionId;
    }
    delete activity.revisionAuthorId;
    delete activity.revisionCreatedAt;
    delete activity.revisionId;
    delete activity.revisionSourceId;
    delete activity.revisionType;
    await save();
  }
</script>

<div class="w-full flex">
  <button
    data-cy="reset-activity-to-revision-button"
    class="ml-auto mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    on:click={applyRevisionToActivity}
  >
    Activiteit terugzetten naar deze versie
  </button>
</div>
