<script>
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import AdventureForm from "./form.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Tabs/goal.svelte";
  export let firebase;
  export let goal;
  export let activity;

  let adventure = {
    svg: "",
    difficulty: 3,
    type: "explanation",
  };
  let alert = getDefaultAlertValues();
  let db;
  let buttonDisabled = false;
  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  onMount(async () => {
    db = await firebase.firestore();
  });

  async function createAdventure() {
    let serverTimestamp = firebase.firestore.Timestamp.now().seconds;

    let data = {
      difficulty: adventure.difficulty,
      svg: adventure.svg,
      type: adventure.type,
      title: activity.title,
      description: activity.description,
      descriptionRaw: activity.descriptionRaw,
      quizzes: activity.quizzes,
      video: activity.video,
      status: "in-progress",
      activityId: activity.id,
      createdAt: serverTimestamp,
      modifiedAt: serverTimestamp,
      lastUpdatesAt: serverTimestamp,
      inProgressAt: serverTimestamp,
      inNeedsWorkAt: serverTimestamp,
      inNeedsForApprovalAt: serverTimestamp,
      inTrashAt: serverTimestamp,
      publishedAt: serverTimestamp,
    };

    alert = getDefaultAlertValues();
    try {
      let collectionRef = db
        .collection("goals")
        .doc(goal.id)
        .collection("adventures");
      let result = await collectionRef.add(data);
      alert.success = true;
      alert.successTitle = "Avontuur gemaakt";
      alert.successMessage = "id: " + result.id;
      setTimeout(() => {
        goto("/leerdoel/" + goal.id + "/avontuur/" + result.id + "/work");
      }, 3000);
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
  }

  function goBackToActivityPreview() {
    goto("/leerdoel/" + goal.id + "/avontuur-maken/" + activity.id);
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createAdventure();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<div>
  <MainTabs bind:goal mainSelected="adventures" />
  <ResultFeedback bind:alert />

  <div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Avontuur maken
          </h3>
          <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Maak hier elke soort activiteit, bijvoorbeeld een uitleg video of
            quiz.
          </p> -->
        </div>
      </div>
    </div>
  </div>
  <form
    class="space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={formSubmit}
  >
    <AdventureForm bind:adventure />

    <div class="">
      <div class="pt-5">
        <button
          class="float-left mt-3bg-white py-2 ml-auto px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click|preventDefault={goBackToActivityPreview}
          >Terug naar activiteit</button
        >
        <div class="flex justify-end">
          <button
            disabled={buttonDisabled}
            type="submit"
            class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Avontuur aanmaken
          </button>
        </div>
      </div>
    </div>
  </form>
</div>
