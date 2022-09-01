<script>
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import ConnectionForm from "$lib/Goal/Connection/Components/form.svelte";
  
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";

  export let goal;
  export let connectionGoal;
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";
  
  let connection = {
    type: "prerequisit",
    description: "",
  };

  let alert = getDefaultAlertValues();
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

  async function createConnection() {
    let db = $firebase.firestore();
    let serverTimestamp = $firebase.firestore.Timestamp.now().seconds;

    let data = {
      sourceId: goal.id,
      type: connection.type,
      linkId: connectionGoal.id,
      authorId: $user.uid,
      status: "in-progress",
      sourceType: "goal",
      linkType: "goal",
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
          title: $t("description"),
          value: connectionGoal.description,
        },
        {
          title: $t("reason-to-create-connection"),
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

  <CheckPlayerHasProfile />

  <ResultFeedback bind:alert />

  <div class="mt-8">
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$t("create-connection")}
          </h3>
          <p>
            {$t("goal-1")}:
            <a class="underline" href="/leerdoel/{goal.id}">{goal.title}</a>
            <br />
            {$t("goal-2")}
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
      <div class="pt-5 flex justify-between">
        <Button
          on:click={goBackToSearchLearningGoal}
          content={$t("back-to-connection-search")}
        />

        <Button
          isDisabled={buttonDisabled || !$player.hasCurriculumProfile}
          isSubmit={true}
          content={$t("create-connection")}
          color="primary"
        />
      </div>
    </div>
  </form>
</div>
