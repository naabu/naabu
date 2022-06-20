<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { getStores, session } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    getDifficultyToString,
    getTypeText,
  } from "$lib/Activity/Components/helper";
  import {
    getActivitySort,
    getDifferencesBetweenRevisions,
  } from "$lib/Internals/Revision/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { getPluginDataFromForm } from "$lib/Internals/Plugin/data";
  import { t } from "svelte-intl-precompile";
  import { createUpdate } from "$lib/Internals/Update/helper";
  import { firebase } from "$lib/Internals/Firebase/store";

  export let showActivity;
  export let activity;

  let buttonDisabled = false;

  let connectionData;

  $: if (activity) {
    connectionData = {
      type: "goal-activity",
      sourceId: activity.goalId,
      linkId: activity.id,
      sourceType: "goal",
      linkType: "activity",
      updatedAt:$firebase.firestore.Timestamp.now().seconds,
      inProgressAt:$firebase.firestore.Timestamp.now().seconds,
      authorId: $session.user.uid,
      title: activity.title,
      fields: [
        {
          title: $t("description"),
          value: activity.description,
        },
        {
          title: $t("difficulty"),
          value: getDifficultyToString(activity.difficulty, $t),
        },
        {
          title: $t("type"),
          value: getTypeText(activity.type, $t),
        },
      ],
    };
  }



  function goBackToActivityEdit() {
    goto("/lerarenkamer/activiteit/" + activity.id);
  }

  async function updateConnection() {
    let db = $firebase.firestore();
    buttonDisabled = true;
    if ($session.user.uid) {
      let connectionCollRef = db.collection("connections");
      try {
        let connectionRef = connectionCollRef.doc(activity.connectionId);
        let connectionSnap = await connectionRef.get();
        if (connectionSnap.exists) {
          let connection = connectionSnap.data();
          let previousRevisionId = connection.lastRevisionId;
          connectionData.lastRevisionId = activity.latestRevisionId;
          await connectionRef.update(connectionData);

          // Get the previousRevision;
          let previousRevisionRef = db
            .collection("revisions")
            .doc(previousRevisionId);
          let previousRevisionSnap = await previousRevisionRef.get();
          if (previousRevisionSnap.exists) {
            let previousRevision = previousRevisionSnap.data();
            let sortListOrder = getActivitySort();

            if (activity.plugins) {
              activity.plugins = getPluginDataFromForm(activity.plugins);
            }

            let differences = getDifferencesBetweenRevisions(
              previousRevision,
              activity,
              sortListOrder
            );
            if (differences.length > 0) {
              let updateData = {
                type: "activity-updated-teacher",
                differences: differences,
                authorId: $session.user.uid,
                createdAt:$firebase.firestore.Timestamp.now().seconds,
                connectionId: activity.connectionId,
                connectionSourceId: connection.sourceId,
                connectionLinkId: connection.linkId,
                connectionType: connection.type,
                connectionSourceType: connection.sourceType,
                connectionLinkType: connection.linkType,
              };

              await createUpdate(db, $session, updateData);
            }
            goto(
              "/leerdoel/" +
                activity.goalId +
                "/activiteiten/" +
                activity.connectionId
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function openActivity() {
    let db = $firebase.firestore();
    buttonDisabled = true;
    if ($session.user.uid) {
      let connectionCollRef = db.collection("connections");
      try {
        connectionData.createdAt =$firebase.firestore.Timestamp.now().seconds;
        connectionData.status = "in-progress";
        connectionData.lastRevisionId = activity.latestRevisionId;
        let result = await connectionCollRef.add(connectionData);

        let activityData = {
          status: "open",
          connectionId: result.id,
          connectionStatus: "in-progress",
        };

        let activityRef = db.collection("activities").doc(activity.id);
        activityRef.update(activityData);

        if (activity.plugins) {
          activity.plugins = getPluginDataFromForm(activity.plugins);
        }
        goto("/leerdoel/" + activity.goalId + "/activiteiten/" + result.id);
      } catch (e) {
        console.error(e);
      }
    }
  }
</script>

{#if showActivity}
  <ShowActivity
    
    bind:activity={showActivity}
    showFeedback={false}
  />
{/if}

{#if $session.user}
  <div class="flex justify-between mt-8 mb-32">
    <Button
      dataTest="back-to-form-button"
      content={$t("back")}
      on:click={goBackToActivityEdit}
    />

    {#if activity.connectionId}
      <Button
        color="primary"
        isDisabled={buttonDisabled}
        dataTest="update-activity-learning-goal-button"
        content={$t("connection-update")}
        on:click={updateConnection}
      />
    {:else}
      <Button
        color="primary"
        isDisabled={buttonDisabled}
        dataTest="connect-activity-learning-goal-button"
        content={$t("connection-create")}
        on:click={openActivity}
      />
    {/if}
  </div>
{:else}
  {$t("login-to-connect-activity")}
{/if}
