<script>
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import ConnectionForm from "./form.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Tabs/goal.svelte";
  export let firebase;
  export let goal;
  export let connectionGoal;

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
      connectionDescription: connection.description,
      status: "in-progress",
      connectionGoalId: connectionGoal.id,
      title: connectionGoal.title,
      description: connectionGoal.description,
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
        .collection(connection.type);
      let result = await collectionRef.add(data);
      alert.success = true;
      alert.successTitle = "Verbinding gemaakt";
      alert.successMessage = "id: " + result.id;
      setTimeout(() => {
        let typeToLink;

        switch (connection.type) {
          case "prerequisites":
            typeToLink = "voorkennis";
            break;
          case "specializations":
            typeToLink = "specialisatie";
            break;
          case "bigideas":
            typeToLink = "groot-idee";
            break;
          case "deeperunderstandings":
            typeToLink = "dieper-inzicht";
            break;
        }

        goto(
          "/leerdoel/" +
            goal.id +
            "/" +
            typeToLink +
            "/" +
            result.id
        );
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
            disabled={buttonDisabled}
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
