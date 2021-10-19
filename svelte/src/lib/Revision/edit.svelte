<script>
  import { getStores, session, page } from "$app/stores";
  import GoalForm from "$lib/Goal/form.svelte";
  import { onMount } from "svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import MainTabs from "$lib/Tabs/revision.svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { createRevision, getGoalSaveData } from "$lib/Goal/helper";

  export let battleCol;
  export let firebase;

  let y;

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
      url: "/beheer/leerdoel/" + $page.params.id + "/wijzigen",
      value: "Leerdoel wijzigen",
    },
  ];

  export let revisionRef;
  let revisionSnap;
  let revision;

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
    revisionSnap = await revisionRef.get();
    if (revisionSnap.exists) {
      revision = revisionSnap.data();
      revision.id = revisionRef.id;
      revision.revisionId = revisionRef.id;
      if (!revision.goalLinks) {
        revision.goalLinks = [];
      }
      if (!revision.unitopic) {
        revision.unitopic = "";
      }
      if (!revision.multitopics) {
        revision.multitopics = [];
      }
      if (!revision.context) {
        revision.context = "";
      }
      if (!revision.selectedVerbs) {
        revision.selectedVerbs = [];
      }
      if (!revision.fromText) {
        revision.fromText = "";
      }
      if (!revision.battles) {
        revision.battles = [];
      }
    }
    const querySnapshot = await battleCol.get();
    querySnapshot.forEach((doc) => {
      let battleObject = doc.data();
      battleObject.name = doc.id;
      revision.battles = [...revision.battles, battleObject];
    });
  });

  async function editGoal() {
    const db = await firebase.firestore();
    let data = getGoalSaveData(revision);

    alert = getDefaultAlertValues();
    // Edit a goal not a revision!
    try {
      if (
        $session.user &&
        $session.user.idTokenResult.claims.curriculumProfileId
      ) {
        let goalRef = db.collection("goals").doc(revision.goalId);
        await goalRef.update(data);
        for (let i = 0; i < revision.battles.length; i++) {
          let battleDocRef = db.doc(
            "/goals/" + goalRef.id + "/battles/" + revision.battles[i].name
          );
          let battleData = {
            quizzes: revision.battles[i].quizzes,
          };

          let snap = await battleDocRef.get();
          if (snap.exists) {
            await battleDocRef.update(battleData);
          } else {
            await battleDocRef.set(battleData);
          }
        }

        data.authorId = $session.user.idTokenResult.claims.curriculumProfileId;
        data.goalId = goalRef.id;
        await createRevision(db, revision, data);
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

<svelte:window bind:scrollY={y} />

{#if revision}
  <div>
    <MainTabs bind:revision subSelected="edit" />
    <ShowBreadcrumb bind:breadcrumbs />

    <div class="rounded-md bg-yellow-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">
            Waarschuwing: u bewerkt een oude versie van deze pagina.
          </h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p>
              Als u uw bewerking opslaat, gaan alle wijzigingen verloren die na
              deze versie zijn gemaakt.
            </p>
            <p>
              <a
                class="underline"
                href="/beheer/leerdoel/{revision.goalId}/wijzigen"
                >bewerk huidige versie</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <ResultFeedback bind:alert />

    <div>
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Leerdoel wijzigen
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500" />
          </div>
        </div>
      </div>
    </div>
    <form
      class="space-y-8 divide-y divide-gray-200"
      on:submit|preventDefault={formSubmit}
    >
      <GoalForm bind:goal={revision} />

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Leerdoel publiseren
          </button>
        </div>
      </div>
    </form>
  </div>
{/if}
