<script>
 // import firebase from "firebase/app";
  // import { getFirebaseFirestore } from "$lib/firebase";
  // import { collection, getDoc, updateDoc, query, getDocs, doc } from "firebase/firestore";
  import { getStores, session, page } from "$app/stores";
  import GoalForm from './form.svelte';
	import { onMount } from 'svelte';
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  
  export let battleCol;
  export let firebase;

  let y;

  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    },
    {
      url: '/beheer/leerdoel',
      value: 'Leerdoel'
    },
    {
      url: "/beheer/leerdoel/" + $page.params.id + "/wijzigen",
      value: 'Leerdoel wijzigen'
    },
  ];

  export let goalRef;
  let goalSnap;
  let goal;

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
    goalSnap = await goalRef.get();
    if (goalSnap.exists) {
			goal = goalSnap.data();
      goal.id = goalRef.id;
      if (!goal.goalLinks) {
        goal.goalLinks = []
      }
      if (!goal.unitopic) {
        goal.unitopic = "";
      }
      if (!goal.multitopics) {
        goal.multitopics = [];
      }
      if (!goal.context) {
        goal.context = "";
      }
      if (!goal.selectedVerbs) {
        goal.selectedVerbs = [];
      }
      if (!goal.fromText) {
        goal.fromText = "";
      }
      if (!goal.battles) {
        goal.battles = [];
      }
		}
    const querySnapshot = await battleCol.get();
    querySnapshot.forEach((doc) => {
      let battleObject =  doc.data();
      battleObject.name = doc.id;
      goal.battles = [...goal.battles, battleObject];
    });
  });


  async function editGoal() {
    const db = await firebase.firestore();
    let addLeerdoelen = [];

    for (let i = 0; i < goal.goalLinks.length; i++) {
      let toAdd = {};
      toAdd.objectID =  goal.goalLinks[i].objectID;
      toAdd.taxonomy_solo =  goal.goalLinks[i].taxonomy_solo;
      toAdd.taxonomy_bloom =  goal.goalLinks[i].taxonomy_bloom;
      toAdd.title = goal.goalLinks[i].title;
      addLeerdoelen = [... addLeerdoelen, toAdd]
    }

    const data = {
      title: goal.title,
      goalLinks: addLeerdoelen,
      description: goal.description,
      taxonomy_solo: goal.taxonomy_solo,
      taxonomy_bloom: goal.taxonomy_bloom,
      visibility: 'public',
      unitopic: goal.unitopic,
      context: goal.context,
      multitopics: goal.multitopics,
      selectedVerbs: goal.selectedVerbs,
      fromText: goal.fromText,
    };
    alert = getDefaultAlertValues();
    try {
      await goalRef.update(data);
      for (let i = 0; i < goal.battles.length; i++) {
        let battleDocRef = db.doc(
          "/goals/" + goalRef.id + "/battles/" + goal.battles[i].name
        );
        let battleData = {
          quizzes: goal.battles[i].quizzes,
        }

        let snap = await battleDocRef.get();
        if (snap.exists) {
          await battleDocRef.update(battleData);
        }
        else {
          await battleDocRef.set(battleData);
        }

      }
      alert.success = true;
      alert.successTitle = "Leerdoel gewijzigd";
      alert.successMessage = "id: " + goalRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
  }

  async function formSubmit(event) {
    await editGoal();
  }

</script>

<svelte:window bind:scrollY={y}/>

{#if goal}

  <div>
    <ShowBreadcrumb bind:breadcrumbs />

    <ResultFeedback bind:alert />

    <div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Leerdoel maken</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Als je een leerdoel maakt wordt niet niet meteen gepuliceerd. Dat kan pas nadat je hem aangemaakt hebt.
            </p>
          </div>
        </div>

      </div>
    </div>
    <form class="space-y-8 divide-y divide-gray-200" on:submit|preventDefault={formSubmit}>
      <GoalForm bind:goal />

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Leerdoel wijzigen
          </button>
        </div>
      </div>
    </form>

    
  </div>
{/if}