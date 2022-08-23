<script>
    // import$firebase from "firebase/app";
    import { getStores, session } from "$app/stores";
    import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
    import TopicForm from "$lib/Topic/Form.svelte";
    import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
    import { goto } from "$app/navigation";
    import Button from "$lib/Internals/Button/Button.svelte";
    import { t } from "svelte-intl-precompile";
    import { firebase } from "$lib/Internals/Firebase/store";
   
  
    let y;
    let buttonDisabled = false;
    let hasCurriculumProfile;
  
  
  
    let topic = {
      title: "",
      description: "",
      goals: [],
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
  
    async function createTopic() {
      let db = $firebase.firestore();
      if ($session.user) {
  
        try{
          alert.success = true;
          alert.successTitle = $t("goal-created")
          alert.successMessage = "id: " + result.id;
          await goto("/topic/" + result.id);
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
      await createTopic();
      setTimeout(() => {
        buttonDisabled = false;
      }, 5000);
    }
  </script>
  
  <svelte:window bind:scrollY={y} />
  
  Test

  <div>
    <ResultFeedback bind:alert />
    <CheckPlayerHasProfile bind:hasCurriculumProfile type="topic"/>
  
    <form
      class="mt-8 space-y-8"
      on:submit|preventDefault={formSubmit}
    >
      <TopicForm bind:topic />
      <div class="pt-5">
        <div class="flex justify-end">
          <Button content={$t("create-topic")} 
            isDisabled={buttonDisabled || !hasCurriculumProfile}
            isSubmit={true}
            color="primary"
            dataTest="create-goal-submit-button"/>
        </div>
      </div>
    </form>
  </div>