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
  import { getStores, session } from "$app/stores";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { getDefaultAlertValues } from "$lib/Internals/Misc/helper";
  import { createRevision } from "$lib/Internals/Revision/helper";
  import { createEventDispatcher } from "svelte";

  export let toggle = false;
  export let showPluginSelector = true;
  export let activity;
  export let goal;
  export let model;
  export let reset = false;
  export let hasCurriculumProfile = false;
  const dispatch = createEventDispatcher();
  let alert;

  let buttonDisabled = false;
  let userChangedTitle = false;

  export let knowledgeComponent;

  let slideOverTitle = $t("add-new-activity-to-model");

  let knowledgeComponentText = "";
  let connectionData;

  $: if (activity) {
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
      authorId: $session.user.uid,
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

  $: if (!activity && model && knowledgeComponent && $session.player) {
    activity = getDefaultEmptyActivity(getDefaultTitle());
    activity.status = "published";
  }

  $: if (reset) {
    if (!userChangedTitle) {
      activity.title = getDefaultTitle();
    }
    reset = false;
  }

  function getDefaultTitle() {
    let defaultTitle = knowledgeComponentText;
    return defaultTitle;
  }

  function closeForm() {
    toggle = false;
    showPluginSelector = false;
  }

  async function createActivity() {
    let db = await $firebase.firestore();
    if (hasCurriculumProfile) {
      let activityData = getActivitySaveData(activity);

      activityData.plugins = getPluginDataFromForm(activity.plugins);

      activityData.authorId = $session.user.uid;
      alert = getDefaultAlertValues();
      try {
        let collectionRef = db.collection("activities");
        let result = await collectionRef.add(activityData);
        activity.id = result.id;

        let resultRevision = await createRevision(
          $firebase,
          activity,
          activityData,
          $session.user.uid
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

<ResultFeedback bind:alert />

<!-- Background backdrop, show/hide based on slide-over state. -->
<div class="fixed inset-y-0 right-0 max-w-3xl flex z-10">
  <Transition
    {toggle}
    inTransition="transform transition ease-in-out duration-500 sm:duration-700"
    inState="translate-x-full"
    onState="translate-x-0"
    outTransition="transform transition ease-in-out duration-500 sm:duration-700"
    outState="translate-x-full"
  >
    <div class="pointer-events-auto w-screen max-w-3xl">
      <div
        class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <div>
              <h2
                class="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                {slideOverTitle}
              </h2>
              <AdditionalFormText content={knowledgeComponentText} />
            </div>
            <div class="ml-3 flex h-7 items-center">
              <button
                type="button"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                on:click={closeForm}
              >
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="relative mt-6 flex-1 px-4 sm:px-6">
          {#if activity}
            <form
              class="space-y-8 divide-y divide-gray-200"
              on:submit|preventDefault={formSubmit}
            >
              <ActivityForm
                bind:activity
                showGoalForm={false}
                bind:userChangedTitle
              />

              <div class="">
                <div class="pt-5">
                  <div class="flex justify-end">
                    <Button
                      color="primary"
                      isSubmit={true}
                      isDisabled={buttonDisabled || !hasCurriculumProfile}
                      dataTest="submit-activity-create-button"
                      content={$t("activity-save-concept-and-look")}
                    />
                  </div>
                </div>
              </div>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </Transition>
</div>
