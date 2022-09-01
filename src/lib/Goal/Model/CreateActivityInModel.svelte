<script>
  import Transition from "svelte-class-transition";
  import { t } from "svelte-intl-precompile";
  import ActivityForm from "$lib/Activity/Components/form.svelte";
  import {
    getActivitySaveData,
    getDefaultEmptyActivity,
    getDifficultyToString,
    getTypeText,
  } from "$lib/Activity/Components/helper";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  
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
  export let model;
  export let toggle;
  export let reset = false;
  const dispatch = createEventDispatcher();
  let alert;

  let buttonDisabled = false;
  let userChangedTitle = false;

  $: console.log($user)

  export let knowledgeComponent;

  let slideOverTitle = $t("add-new-activity-to-model");

  let knowledgeComponentText = "";
  let connectionData;

  $: if (activity && $user) {
    connectionData = {
      type: "goal-activity",
      sourceId: activity.goalId,
      linkId: activity.id,
      sourceType: "goal",
      linkType: "activity",
      lastUpdatesAt: $firebase.firestore.Timestamp.now().seconds,
      updatedAt: $firebase.firestore.Timestamp.now().seconds,
      publishedAt: $firebase.firestore.Timestamp.now().seconds,
      modifiedAt: $firebase.firestore.Timestamp.now().seconds,
      authorId: $user.uid,
      title: activity.title,
      fields: [
        {
          title: $t("difficulty"),
          value: getDifficultyToString(activity.difficulty, $t),
        },
        {
          title: $t("type"),
          value: getTypeText(activity.type, $t),
        },
      ],
    };
  }

  $: if (knowledgeComponent) {
    knowledgeComponentText = knowledgeComponent.abstract;
  }

  $: if (activity && goal) {
    activity.goalId = goal.id;
    activity.goalTitle = goal.title;
  }

  $: if (!activity && model && knowledgeComponent && $player) {
    activity = getDefaultEmptyActivity(getDefaultTitle());
    activity.status = "published";
  }

  $: if (reset) {
    if (!userChangedTitle) {
      activity.title = getDefaultTitle();
    }
    reset = false;
  }

  function closeForm() {
    toggle = false;
    dispatch("close");
  }

  function getDefaultTitle() {
    let defaultTitle = knowledgeComponentText;
    return defaultTitle;
  }

  async function createActivity() {
    let db = await $firebase.firestore();
    if ($player.hasCurriculumProfile) {
      let activityData = getActivitySaveData(activity);

      activityData.plugins = getPluginDataFromForm(activity.plugins);

      activityData.authorId = $user.uid;
      alert = getDefaultAlertValues();
      try {
        let collectionRef = db.collection("activities");
        let result = await collectionRef.add(activityData);
        activity.id = result.id;

        let resultRevision = await createRevision(
          $firebase,
          activity,
          activityData,
          $user.uid
        );

        let connectionCollRef = db.collection("connections");
        connectionData.createdAt = $firebase.firestore.Timestamp.now().seconds;
        connectionData.status = "published";
        connectionData.lastRevisionId = resultRevision.id;
        let resultConnection = await connectionCollRef.add(connectionData);

        activityData = {
          latestRevisionId: resultRevision.id,
          latestRevisionCreatedAt: $firebase.firestore.Timestamp.now().seconds,
          connectionId: resultConnection.id,
          connectionStatus: "published",
        };
        await collectionRef.doc(activity.id).update(activityData);

        knowledgeComponent.activities = [
          ...knowledgeComponent.activities,
          {
            connectionId: resultConnection.id,
            activityId: activity.id,
            title: activity.title,
          },
        ];

        closeForm();
        dispatch("formActivityComplete");

        alert.success = true;
        alert.successTitle = $t("activity-create-success-title");
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
    await createActivity();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<MediumRightSlideOver
  bind:toggle
  bind:slideOverTitle
  bind:slideOverText={knowledgeComponentText}
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
              dataTest="submit-activity-create-button"
              content={$t("create-activity")}
            />
          </div>
        </div>
      </div>
    </form>
  {/if}
</MediumRightSlideOver>
