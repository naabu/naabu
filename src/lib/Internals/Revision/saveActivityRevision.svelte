<script>
  import { goto } from "$app/navigation";
  
  import { getActivitySaveData } from "$lib/Activity/Components/helper";
  import { createRevision } from "$lib/Internals/Revision/helper";
  import Button from "../Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";

  export let revision;
 
  export let latestRevisionId;
  let activity;

  async function save() {
    let db = await $firebase.firestore();
    if ($user) {
      let activityData = getActivitySaveData(activity);
      let resultRevision = await createRevision(
       $firebase,
        activity,
        activityData,
        $user.uid
      );

      activityData.latestRevisionId = resultRevision.id;
      activityData.latestRevisionCreatedAt =$firebase.firestore.Timestamp.now().seconds;

      if (activity.latestRevisionId) {
        activityData.previousRevisionId = activity.latestRevisionId;
      }

      activityData.authorId = $user.uid;
      delete activityData.status;
      let db =$firebase.firestore();

      let ref = db.collection("activities").doc(activity.id);
      try {
        await ref.update(activityData);
        goto("/lerarenkamer/activiteit/" + activity.id);
      } catch (e) {
        console.error($t("error-adding-document") +": ", e);
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

<div class="w-full flex justify-end mt-3">
  <Button
    dataTest="reset-activity-to-revision-button"
    content={$t("reset-activity-to-this-version")}
    color="primary"
    on:click={applyRevisionToActivity}
  />
</div>
