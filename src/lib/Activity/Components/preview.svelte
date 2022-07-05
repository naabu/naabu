<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { getStores, session } from "$app/stores";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";

  export let showActivity;
  export let activity;
  let buttonDisabled = false;

  function goBackToActivityEdit() {
    goto("/lerarenkamer/activiteit/" + activity.id);
  }

  async function connectionUpdateActivity() {
    let db = $firebase.firestore();
    buttonDisabled = true;
    if ($session.user.uid) {
      try {
        let activityRef = db.collection("activities").doc(activity.id);
        activityRef.update({
          updateConnectionAt: $firebase.firestore.Timestamp.now().seconds,
        });

        goto("/leerdoel/" + activity.goalId + "/activiteiten/" + activity.id);
      } catch (e) {
        console.error(e);
      }
    }
  }
</script>

{#if showActivity}
  <ShowActivity bind:activity={showActivity} showFeedback={false} />
{/if}

{#if $session.user}
  <div class="flex justify-between mt-8 mb-32">
    <Button
      dataTest="back-to-form-button"
      content={$t("back")}
      on:click={goBackToActivityEdit}
    />

    {#if activity.updateConnectionAt}
      <Button
        color="primary"
        isDisabled={buttonDisabled}
        dataTest="update-activity-learning-goal-button"
        content={$t("connection-update")}
        on:click={connectionUpdateActivity}
      />
    {:else}
      <Button
        color="primary"
        isDisabled={buttonDisabled}
        dataTest="connect-activity-learning-goal-button"
        content={$t("connection-create")}
        on:click={connectionUpdateActivity}
      />
    {/if}
  </div>
{:else}
  {$t("login-to-connect-activity")}
{/if}
