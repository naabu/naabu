<script>
  import ShowActivity from "$lib/Activity/show.svelte";
  import { getStores, session } from "$app/stores";
  import MainTabs from "$lib/Tabs/goal.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { getCurriculumProfile } from "$lib/Curriculum/helper";
  import {
    getActivitySaveData,
    getDifficultyToString,
    getTypeText,
  } from "./helper";
  import {
    createRevision,
    getActivitySort,
    getDifferencesBetweenRevisions,
  } from "$lib/Revision/helper";
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

            let updateData = {
              type: "activity-updated-teacher",
              differences: differences,
              authorId: $session.user.uid,
              createdAt: firebase.firestore.Timestamp.now().seconds,
              connectionId: activity.connectionId,
            };

            await createUpdate(updateData);
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
  <div class="mt-8 mb-32">
    <button
      class="float-left mt-3bg-white py-2 ml-auto px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click|preventDefault={goBackToActivityEdit}>Terug</button
    >

    {#if activity.connectionId}
      <button
        disabled={buttonDisabled}
        class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        on:click|preventDefault={updateConnection}
        >Koppeling met leerdoel updaten</button
      >
    {:else}
      <button
        disabled={buttonDisabled}
        class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        on:click|preventDefault={openActivity}
        >Deze activiteit koppelen met leerdoel</button
      >
    {/if}
  </div>
{:else}
  Je moet ingelogd zijn om deze activiteit te kunnen koppelen.
{/if}
