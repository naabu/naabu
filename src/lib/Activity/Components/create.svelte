<script>
  
  import ActivityForm from "$lib/Activity/Components/form.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import {
    getActivitySaveData,
    getDefaultEmptyActivity,
  } from "$lib/Activity/Components/helper";
  import { goto } from "$app/navigation";
  import { createRevision } from "$lib/Internals/Revision/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { t } from "svelte-intl-precompile";
  import { user } from "$lib/Internals/User/store";
  export let goal;
  let draftId;

  async function goBackToSearchGoals() {
    let changeDetected = activityIsNotDefault();
    if (changeDetected) {
      await createActivity();
    }
    if (changeDetected && draftId) {
      goto(
        "/lerarenkamer/activiteit/maken-leerdoel-zoeken?activityId=" + draftId
      );
    } else {
      goto("/lerarenkamer/activiteit/maken-leerdoel-zoeken");
    }
  }

  function activityIsNotDefault() {
    if (activity.title !== "") {
      return true;
    }
    if (activity.descriptionRaw !== "") {
      return true;
    }
    if (activity.description !== "") {
      return true;
    }
    if (activity.type !== "") {
      return true;
    }
    if (activity.difficulty !== 1) {
      return true;
    }
    if (activity.svg !== "") {
      return true;
    }
    if (activity.video.vimeoId !== null) {
      return true;
    }
    if (activity.quizzes.length !== 0) {
      return true;
    }
    return false;
  }

  let y;

  let activity = getDefaultEmptyActivity();

  $: if (goal) {
    activity.goalId = goal.id;
    activity.goalTitle = goal.title;
  }

  let buttonDisabled = false;
  let alert = getDefaultAlertValues();

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  async function createActivity() {
    let db = await $firebase.firestore();
    if ($user) {
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

        activityData = {
          latestRevisionId: resultRevision.id,
          latestRevisionCreatedAt: $firebase.firestore.Timestamp.now().seconds,
        };
        await collectionRef.doc(activity.id).update(activityData);
        goto("/lerarenkamer/activiteit/" + activity.id + "/preview");
        alert.success = true;
        alert.successTitle = $t("activity-create-success-title");
        alert.successMessage = "id: " + result.id;
        draftId = result.id;
      } catch (e) {
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
      y = 0;
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

<svelte:window bind:scrollY={y} />

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css"
    integrity="sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs"
    crossorigin="anonymous"
  />
</svelte:head>

<div>
  <ResultFeedback bind:alert />

  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <p class="max-w-2xl text-sm text-gray-500">
            {$t("activity-create-title")}
          </p>
        </div>
      </div>
    </div>
  </div>
  <form
    class="space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={formSubmit}
  >
    <ActivityForm on:toLearningGoals={goBackToSearchGoals} bind:activity />

    <div class="">
      <div class="pt-5">
        <div class="flex justify-end">
          <Button
            color="primary"
            isSubmit={true}
            bind:isDisabled={buttonDisabled}
            dataTest="submit-activity-create-button"
            content={$t("activity-save-concept-and-look")}
          />
        </div>
      </div>
    </div>
  </form>
</div>
