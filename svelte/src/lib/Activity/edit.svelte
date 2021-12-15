<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import ActivityForm from "./form.svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { getActivitySaveData } from "./helper";
  import { goto } from "$app/navigation";
  import { getDefaultAlertValues } from "$lib/Misc/helper";
  import {
    createRevision,
    getDifferencesBetweenRevisions,
  } from "$lib/Revision/helper";

  let y;
  export let previousActivity;
  export let activity;
  export let firebase;

  let db;

  onMount(async () => {
    db = await firebase.firestore();
  });

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

      let differences = getDifferencesBetweenRevisions(
        previousActivity,
        activityData
      );
      if (differences.length > 0) {
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
      }

      activityData.authorId = $session.user.uid;
      alert = getDefaultAlertValues();
      let db = firebase.firestore();

      let ref = db.collection("activities").doc(activity.id);
      try {
        await ref.update(activityData);
        alert.success = true;
        alert.successTitle = "Activiteit gewijzigd";
        alert.successMessage = "id: " + ref.id;
      } catch (e) {
        console.error("Error adding documfent: ", e);
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
                Maak hier elke soort activiteit, bijvoorbeeld een uitleg video
                of quiz.
              {:else}
                Wijzig hier je activiteit
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
            <button
              data-cy="edit-activity-submit-button"
              type="submit"
              class="float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Concept opslaan en bekijken
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
{/if}
