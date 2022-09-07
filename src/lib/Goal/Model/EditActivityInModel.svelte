<script>
  import { t } from "svelte-intl-precompile";
  import ActivityForm from "$lib/Activity/Components/form.svelte";
  import { getActivitySaveData } from "$lib/Activity/Components/helper";
  
  import Button from "$lib/Internals/Button/Button.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { getDefaultAlertValues } from "$lib/Internals/Misc/helper";
  import { createRevision } from "$lib/Internals/Revision/helper";
  import { createEventDispatcher } from "svelte";
  import MediumRightSlideOver from "$lib/Internals/SlideOver/MediumRight.svelte";
  import { user, player } from "$lib/Internals/User/store";

  export let activity;
  export let goal;
  export let toggle;
  const dispatch = createEventDispatcher();
  let alert;

  let buttonDisabled = false;
  let userChangedTitle = false;

  export let knowledgeComponent;

  let slideOverTitle = $t("edit-activity-in-model");

  let knowledgeComponentText = "";

  $: if (knowledgeComponent) {
    knowledgeComponentText = knowledgeComponent.abstract;
  }

  $: if (activity && goal) {
    activity.goalId = goal.id;
    activity.goalTitle = goal.title;
  }

  function closeForm() {
    toggle = false;
    dispatch("close");
  }

  async function editActivity() {
    let db = await $firebase.firestore();
    if ($player.hasCurriculumProfile) {
      let activityData = getActivitySaveData(activity);
      activityData.plugins = getPluginDataFromForm(activity.plugins);
      activityData.authorId = $user.uid;
      activityData.updateConnectionAt = $firebase.firestore.Timestamp.now().seconds,
      alert = getDefaultAlertValues();
      try {
        let collectionRef = db.collection("activities");
        let resultRevision = await createRevision(
          $firebase,
          activity,
          activityData,
          $user.uid
        );
        activityData.latestRevisionId = resultRevision.id;
        activityData.latestRevisionCreatedAt = $firebase.firestore.Timestamp.now().seconds;
        let result = await collectionRef.doc(activity.id).set(activityData);

        closeForm();
        dispatch("formActivityEdit", {activity: activity});
        dispatch("formActivityComplete");

        alert.success = true;
        alert.successTitle = $t("activity-edit-success-title");
        alert.successMessage = "id: " + result.id;
        draftId = result.id;
      } catch (e) {
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await editActivity();
    setTimeout(() => {
      buttonDisabled = false;
    }, 2000);
  }
</script>

<MediumRightSlideOver
  bind:toggle
  bind:slideOverTitle
  bind:slideOverText={knowledgeComponentText}
  on:closeSlideOver={closeForm}
>
  {#if activity}
    <form
      class="space-y-8 divide-y divide-gray-200"
      on:submit|preventDefault={formSubmit}
    >
      <ActivityForm bind:activity showGoalForm={false} bind:userChangedTitle />

      <div class="">
        <div class="pt-5">
          <div class="flex justify-end">
            <Button
              color="primary"
              isSubmit={true}
              isDisabled={buttonDisabled || !$player.hasCurriculumProfile}
              content={$t("edit-activity")}
            />
          </div>
        </div>
      </div>
    </form>
  {/if}
</MediumRightSlideOver>
