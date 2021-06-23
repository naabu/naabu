<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { collection, addDoc, doc, setDoc } from "firebase/firestore";
  import { getStores, session } from "$app/stores";
  import GoalForm from "./form.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";

  let y;
  let db;
  let buttonDisabled = false;

  onMount(async () => {
    db = await getFirebaseFirestore($session.environment);
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
    let addLeerdoelen = [];

    for (let i = 0; i < goal.goalLinks.length; i++) {
      let toAdd = {};
      toAdd.objectID = goal.goalLinks[i].objectID;
      toAdd.taxonomy_solo = goal.goalLinks[i].taxonomy_solo;
      toAdd.taxonomy_bloom = goal.goalLinks[i].taxonomy_bloom;
      toAdd.title = goal.goalLinks[i].title;
      addLeerdoelen = [...addLeerdoelen, toAdd];
    }

    const data = {
      title: goal.title,
      description: goal.description,
      goalLinks: addLeerdoelen,
      taxonomy_solo: goal.taxonomy_solo,
      taxonomy_bloom: goal.taxonomy_bloom,
      visibility: "public",
      unitopic: goal.unitopic,
      context: goal.context,
      multitopics: goal.multitopics,
      selectedVerbs: goal.selectedVerbs,
      fromText: goal.fromText,
    };

    alert = getDefaultAlertValues();
    try {
      let result = await addDoc(collection(db, "goals"), data);
      for (let i = 0; i < goal.battles.length; i++) {
        let battleDocRef = doc(
          db,
          "/goals/" + result.id + "/battles/" + goal.battles[i].name
        );
        let battleData = {
          quizzes: goal.battles[i].quizzes,
        }

        let battleResult = await setDoc(battleDocRef, battleData);
      }

      alert.success = true;
      alert.successTitle = "Leerdoel gemaakt";
      alert.successMessage = "id: " + result.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
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
            Als je een leerdoel maakt wordt niet niet meteen gepuliceerd. Dat
            kan pas nadat je hem aangemaakt hebt.
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
          Leerdoel aanmaken
        </button>
      </div>
    </div>
  </form>
</div>
