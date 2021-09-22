<script>
  // import firebase from "firebase/app";
  import { getStores, session } from "$app/stores";
  import GoalForm from "./form.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { createRevision, getGoalSaveData } from "./helper";
  import { getGoalIndex } from "$lib/algolia";

  export let firebase;

  let y;
  let db;
  let buttonDisabled = false;

  onMount(async () => {
    db = await firebase.firestore();
  });

  let breadcrumbs = [
    {
      url: "/beheer",
      value: "Beheer",
    },
    {
      url: "/beheer/leerdoel",
      value: "Leerdoel",
    },
    {
      url: "/beheer/leerdoel/maken",
      value: "Leerdoel maken",
    },
  ];

  let goal = {
    title: "",
    description: "",
    goalLinks: [],
    taxonomy_bloom: [],
    taxonomy_solo: [],
    unitopic: "",
    multitopics: [],
    context: "",
    selectedVerbs: [],
    fromText: "",
    battles: [],
  };
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

  async function createGoal() {
    if ($session.player && $session.player.id) {
      let data = getGoalSaveData(goal);
      alert = getDefaultAlertValues();
      try {
        let goalResult = await db.collection("goals").add(data);
        for (let i = 0; i < goal.battles.length; i++) {
          let battleDocRef = db.doc(
            "/goals/" + goalResult.id + "/battles/" + goal.battles[i].name
          );
          let battleData = {
            quizzes: goal.battles[i].quizzes,
          };

          await battleDocRef.set(battleData);
        }

        data.authorId = $session.player.id;
        data.goalId = goalResult.id;
        await createRevision(db, goal, data);
        
        alert.success = true;
        alert.successTitle = "Leerdoel gemaakt";
        alert.successMessage = "id: " + goalResult.id;
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
    buttonDisabled = true;
    await createGoal();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<svelte:window bind:scrollY={y} />

<div>
  <ShowBreadcrumb bind:breadcrumbs />
  <ResultFeedback bind:alert />
  <div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Leerdoel maken
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
          </p>
        </div>
      </div>
    </div>
  </div>
  <form
    class="space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={formSubmit}
  >
    <GoalForm bind:goal />

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          disabled={buttonDisabled}
          type="submit"
          class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Leerdoel publiseren
        </button>
      </div>
    </div>
  </form>
</div>
