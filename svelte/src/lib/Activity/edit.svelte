<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { getDoc, updateDoc  } from "firebase/firestore";
  import { getStores } from "$app/stores"
  const { session, page } = getStores();
	import { onMount } from 'svelte';
  import ActivityForm from './form.svelte';
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { renderKatexOutput } from "./helper.js";

  export let ref;
  let snap;
  let activity;

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
      url: "/beheer/activiteit/" + $page.params.id + "/wijzigen",
      value: 'Activiteit wijzigen'
    },
  ];

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
    snap = await getDoc(ref);
		if (snap.exists()) {
			activity = snap.data();
		}
  });

  async function edit() {
    const db = await getFirebaseFirestore($session.environment);
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
      quizes: activity.quizes,
      visibility: 'public',
      video: {
        vimeoId: activity.video.vimeoId
      }
    };
    alert = getDefaultAlertValues();
    try {
      let result = await updateDoc(ref, data);
      alert.success = true;
      alert.successTitle = "Activiteit gewijzigd";
      // TODO: check out why there is no result?
      alert.successMessage = "id: " + ref.id;
    } catch (e) {
      console.error("Error adding documfent: ", e);
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
  }

  async function formSubmit(event) {
    await edit();
  }

</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc" crossorigin="anonymous">
</svelte:head>

{#if activity}
<div>
  <ShowBreadcrumb bind:breadcrumbs />
  <ResultFeedback bind:alert /> 
  <div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Activiteit wijzigen</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Wijzig hier je activiteit
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
            type="submit"
            class="float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Activiteit wijzigen
          </button>
        </div>
      </div>
    </div>
  </form>

  
</div>

{/if}