<script>
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import ConnectionForm from "$lib/Goal/Connection/Components/form.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  export let firebase;
  export let goal;
  export let connectionGoal;
  let hasCurriculumProfile = false;
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";

  let connection = {
    type: "prerequisit",
    description: "",
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

  async function createConnection() {
    let serverTimestamp = firebase.firestore.Timestamp.now().seconds;

    let data = {
      sourceId: goal.id,
      type: connection.type,
      linkId: connectionGoal.id,
      authorId: $session.user.uid,
      status: "in-progress",
      title: connectionGoal.title,
      createdAt: serverTimestamp,
      modifiedAt: serverTimestamp,
      lastUpdatesAt: serverTimestamp,
      inProgressAt: serverTimestamp,
      inNeedsWorkAt: serverTimestamp,
      inNeedsForApprovalAt: serverTimestamp,
      inTrashAt: serverTimestamp,
      publishedAt: serverTimestamp,
      fields: [
        {
          title: "Beschrijving",
          value: connectionGoal.description,
        },
        {
          title: "Reden tot koppeling",
          value: connection.description,
        },
      ],
    };

    alert = getDefaultAlertValues();
    try {
      let connectionColRef = db.collection("connections");
      let result = await connectionColRef.add(data);
      alert.success = true;
      alert.successTitle = "Verbinding gemaakt";
      alert.successMessage = "id: " + result.id;
      setTimeout(() => {
        let typeToLink;

        switch (connection.type) {
          case "goal-prerequisites":
            typeToLink = "voorkennis";
            break;
          case "goal-specializations":
            typeToLink = "specialisatie";
            break;
          case "goal-bigideas":
            typeToLink = "groot-idee";
            break;
          case "goal-deeperunderstandings":
            typeToLink = "dieper-inzicht";
            break;
        }

        goto("/leerdoel/" + goal.id + "/" + typeToLink + "/" + result.id);
      }, 3000);
    } catch (e) {
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
  }

  function goBackToSearchLearningGoal() {
    goto("/leerdoel/" + goal.id + "/verbinding-maken");
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createConnection();
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

<div>
  <MainTabs bind:goal mainSelected="connections" />

  <CheckPlayerHasProfile bind:hasCurriculumProfile />

  <ResultFeedback bind:alert />

  <div class="mt-8">
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Verbinding maken
          </h3>

          <p>
            Leerdoel 1:
            <a class="underline" href="/leerdoel/{goal.id}">{goal.title}</a>
            <br />
            Leerdoel 2:
            <a class="underline" href="/leerdoel/{connectionGoal.id}"
              >{connectionGoal.title}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <form
    class="space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={formSubmit}
  >
    <ConnectionForm bind:connection />

    <div class="">
      <div class="pt-5">
        <button
          class="float-left mt-3bg-white py-2 ml-auto px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click|preventDefault={goBackToSearchLearningGoal}
          >Terug naar verbinding zoeken</button
        >
        <div class="flex justify-end">
          <button
            disabled={buttonDisabled || !hasCurriculumProfile}
            type="submit"
            class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verbinding aanmaken
          </button>
        </div>
      </div>
    </div>
  </form>
</div>
