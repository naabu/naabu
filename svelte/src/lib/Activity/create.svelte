<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { getStores, session } from "$app/stores"
  import ActivityForm from "./form.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
	import { onMount } from 'svelte';
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { renderKatexOutput } from "./helper.js";

  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    },
    {
      url: '/beheer/activiteit',
      value: 'Activiteit'
    },
    {
      url: '/beheer/activiteit/maken',
      value: 'Activiteit maken'
    },
  ];

  let activity = {
    title: "",
    descriptionRaw: "",
    description: "",
    video: {
      vimeoId: null,
    },
    quizzes: [],
    goals: [],
  }

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
    }
  }

	onMount(async() => {
    db = await getFirebaseFirestore($session.environment);
  });

  async function createActivity() {   
    let addLeerdoelen = [];

    for (let i = 0; i < activity.goals.length; i++) {
      let toAdd = {};
      toAdd.objectID = activity.goals[i].objectID;
      toAdd.taxonomy_solo = activity.goals[i].taxonomy_solo;
      toAdd.taxonomy_bloom = activity.goals[i].taxonomy_bloom;
      toAdd.title = activity.goals[i].title;
      addLeerdoelen = [... addLeerdoelen, toAdd]
    }
    activity.description = renderKatexOutput(activity.descriptionRaw);
    
    const data = {
      title: activity.title,
      goals: addLeerdoelen,
      descriptionRaw: activity.descriptionRaw,
      description: activity.description,
      quizzes: activity.quizzes,
      video: {
        vimeoId: activity.video.vimeoId
      },
      visibility: 'public',
    };
    alert = getDefaultAlertValues();
    try {
      let collectionRef = collection(db, "activities");
      let result = await addDoc(collectionRef, data);
      alert.success = true;
      alert.successTitle = "Activiteit gemaakt";
      alert.successMessage = "id: " + result.id;
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
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

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc" crossorigin="anonymous">
</svelte:head>

<div>
  <ShowBreadcrumb bind:breadcrumbs />

  <ResultFeedback bind:alert /> 

  <div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Activiteit maken</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Maak hier elke soort activiteit, bijvoorbeeld een uitleg video of quiz.
          </p>
        </div>
      </div>
    </div>
  </div>
  <form class="space-y-8 divide-y divide-gray-200" on:submit|preventDefault={formSubmit}>
    <ActivityForm bind:activity/>

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
