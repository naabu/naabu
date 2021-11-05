<script>
  // import { getFirebaseFirestore } from "$lib/firebase.js";
  // import { collection, addDoc, setDoc, doc } from "firebase/firestore";
  import { getStores, session } from "$app/stores";
  import ActivityForm from "./form.svelte";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { renderKatexOutput } from "$lib/Misc/helper.js";
  import { getActivitySaveData } from "./helper";
  export let firebase;
  // import firebase from "firebase/app";

  let y;

  let activity = {
    title: "",
    descriptionRaw: "",
    description: "",
    type: "",
    difficulty: 1,
    svg: "",
    video: {
      vimeoId: null,
    },
    quizzes: [],
    goals: [],
  };

  let db;
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

  onMount(async () => {
    db = await firebase.firestore();
  });

  async function createActivity() {
    let data = getActivitySaveData(activity);
    alert = getDefaultAlertValues();
    try {
      let collectionRef = db.collection("activities");
      let result = await collectionRef.add(data);
      alert.success = true;
      alert.successTitle = "Activiteit gemaakt";
      alert.successMessage = "id: " + result.id;
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
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
            Maak hier elke soort activiteit, bijvoorbeeld een uitleg video of
            quiz.
          </p>
        </div>
      </div>
    </div>
  </div>
  <form
    class="space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={formSubmit}
  >
    <ActivityForm bind:activity />

    <div class="">
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            disabled={buttonDisabled}
            type="submit"
            class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Activiteit aanmaken
          </button>
        </div>
      </div>
    </div>
  </form>
</div>
