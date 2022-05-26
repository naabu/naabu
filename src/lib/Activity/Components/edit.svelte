<script>
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ActivityForm from "$lib/Activity/Components/form.svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import { getActivitySaveData } from "$lib/Activity/Components/helper";
  import { goto } from "$app/navigation";
  import { getDefaultAlertValues } from "$lib/Internals/Misc/helper";
  import {
    createRevision,
    getDifferencesBetweenRevisions,
  } from "$lib/Internals/Revision/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { t } from "svelte-intl-precompile";

  let y;
  export let previousActivity;
  export let activity;
 

  async function goBackToSearchGoals() {
    if (activity.id) {
      await edit();
      goto(
        "/lerarenkamer/activiteit/maken-leerdoel-zoeken?activityId=" +
          activity.id
      );
    }
  }

  let alert = getDefaultAlertValues();

  async function edit() {
    if ($session.user) {
      let activityData = getActivitySaveData(activity);

      activityData.plugins = getPluginDataFromForm(activity.plugins);

      let differences = getDifferencesBetweenRevisions(
        previousActivity,
        activityData
      );
      if (differences.length > 0) {
        let resultRevision = await createRevision(
          $firebase,
          activity,
          activityData,
          $session.user.uid
        );
        activityData.latestRevisionId = resultRevision.id;
        activityData.latestRevisionCreatedAt = $firebase.firestore.Timestamp.now().seconds;

        if (activity.latestRevisionId) {
          activityData.previousRevisionId = activity.latestRevisionId;
        }
      }

      activityData.authorId = $session.user.uid;
      alert = getDefaultAlertValues();
      let db = $firebase.firestore();

      let ref = db.collection("activities").doc(activity.id);
      try {
        await ref.update(activityData);
        alert.success = true;
        alert.successTitle = $t("activity-changed-successfully");
        alert.successMessage = "id: " + ref.id;
      } catch (e) {
        console.error("Error adding document: ", e);
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
      y = 0;
    }
  }

  async function formSubmit(event) {
    await edit();
    goto("/lerarenkamer/activiteit/" + activity.id + "/preview");
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
    crossorigin="anonymous"
  />
</svelte:head>

<svelte:window bind:scrollY={y} />

{#if activity}
  <div>
    <ResultFeedback bind:alert />
    <div>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <div>
            <p class="max-w-2xl text-sm text-gray-500">
              {#if activity.status === "draft"}
                {$t("activity-create-title")}
              {:else}
                {$t("activity-edit-title")}
              {/if}
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
              dataTest="edit-activity-submit-button"
              content={$t("activity-save-concept-and-look")}
            />
          </div>
        </div>
      </div>
    </form>
  </div>
{/if}
