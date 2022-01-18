<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { getStores, session } from "$app/stores";
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { getCurriculumProfile } from "$lib/Goal/Curriculum/Components/helper";
  import {
    getActivitySaveData,
    getDifficultyToString,
    getTypeText,
  } from "$lib/Activity/Components/helper";
  import {
    createRevision,
    getActivitySort,
    getDifferencesBetweenRevisions,
  } from "$lib/Internals/Revision/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  export let firebase;
  export let showActivity;
  export let activity;

  let buttonDisabled = false;

  let db;

  let connectionData;

  $: if (activity) {
    connectionData = {
      type: "goal-activity",
      sourceId: activity.goalId,
      linkId: activity.id,
      updatedAt: firebase.firestore.Timestamp.now().seconds,
      inProgressAt: firebase.firestore.Timestamp.now().seconds,
      authorId: $session.user.uid,
      title: activity.title,
      fields: [
        {
          title: "Beschrijving",
          value: activity.description,
        },
        {
          title: "Moeilijkheid",
          value: getDifficultyToString(activity.difficulty),
        },
        {
          title: "Type",
          value: getTypeText(activity.type),
        },
      ],
    };
  }

  onMount(async () => {
    db = await firebase.firestore();
  });

  function goBackToActivityEdit() {
    goto("/lerarenkamer/activiteit/" + activity.id);
  }

  async function updateConnection() {
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
                createdAt: firebase.firestore.Timestamp.now().seconds,
                connectionId: activity.connectionId,
              };

              await createUpdate(updateData);
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

  async function createUpdate(updateData) {
    if ($session.player.curriculumProfileId) {
      updateData.curriculumProfile = await getCurriculumProfile(
        db,
        $session.player.curriculumProfileId
      );
    }
    let updatesColRef = db.collection("updates");
    await updatesColRef.add(updateData);
  }

  async function openActivity() {
    buttonDisabled = true;
    if ($session.user.uid) {
      let connectionCollRef = db.collection("connections");
      try {
        connectionData.createdAt = firebase.firestore.Timestamp.now().seconds;
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

        let sortListOrder = getActivitySort();
        let differences = getDifferencesBetweenRevisions(
          {},
          activity,
          sortListOrder
        );

        let updateData = {
          type: "created-teacher",
          differences: differences,
          authorId: $session.user.uid,
          createdAt: firebase.firestore.Timestamp.now().seconds,
          connectionId: result.id,
        };
        await createUpdate(updateData);

        goto("/leerdoel/" + activity.goalId + "/activiteiten/" + result.id);
      } catch (e) {
        console.error(e);
      }
    }
  }
</script>

{#if showActivity}
  <ShowActivity
    bind:firebase
    bind:activity={showActivity}
    showFeedback={false}
  />
{/if}

{#if $session.user}
  <div class="flex justify-between mt-8 mb-32">
    <Button
      dataTest="back-to-form-button"
      content="Terug"
      on:click={goBackToActivityEdit}
    />

    {#if activity.connectionId}
      <Button
        color="primary"
        isDisabled={buttonDisabled}
        dataTest="update-activity-learning-goal-button"
        content="Koppeling met leerdoel updaten"
        on:click={updateConnection}
      />
    {:else}
      <Button
        color="primary"
        isDisabled={buttonDisabled}
        dataTest="connect-activity-learning-goal-button"
        content="Deze activiteit koppelen met leerdoel"
        on:click={openActivity}
      />
    {/if}
  </div>
{:else}
  Je moet ingelogd zijn om deze activiteit te kunnen koppelen.
{/if}
