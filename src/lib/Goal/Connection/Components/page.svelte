<script>
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Feeds from "$lib/Update/Components/Feed.svelte";
  import {
    formatActivityKeys,
    formatActivityValue,
    sortOnCreatedAt,
  } from "$lib/Internals/Revision/helper";
 import DOMPurify from 'dompurify';

  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";

  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import {
    formatToTimeAgo,
    getDefaultAlertValues,
    getDiffStrings,
  } from "$lib/Internals/Misc/helper";
  import { getCurriculumProfile } from "$lib/Goal/Curriculum/Components/helper";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Textarea from "../../../Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import { t, locale } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user, player } from "$lib/Internals/User/store";

  export let connection;

  let newCommentText;
  let buttonDisabled = true;
  let timeAgo;
  let timer;
  export let isTeacher;
  let hasCurriculumProfile;
  let updates = [];
  let updatesReceived;

  $: {
    if ($user && connection) {
      isTeacher = $user.uid === connection.authorId;
      if (isTeacher || hasCurriculumProfile) {
        buttonDisabled = false;
      } else {
        buttonDisabled = true;
      }
    } else {
      buttonDisabled = true;
    }
  }

  $: (async () => {
    if (connection && db) {
      if (connection.id !== updatesReceived) {
        updates = [];
        getUpdates();
        setInterval(getUpdates, 3000);
      }
    }
  })();

  async function getUpdates() {
    let updatesCol = db
      .collection("updates")
      .where("connectionId", "==", connection.id);
    const querySnapshot = await updatesCol.get();
    querySnapshot.forEach((updateDoc) => {
      let found = false;
      for (let i = 0; i < updates.length; i++) {
        if (updateDoc.id === updates[i].id) {
          found = true;
        }
      }
      if (!found) {
        let updateObject = updateDoc.data();
        updateObject.id = updateDoc.id;
        updates = [...updates, updateObject];
      }
    });
    sortOnCreatedAt(updates);
    updates = updates.reverse();
    updatesReceived = connection.id;
  }

  $: {
    for (let i = 0; i < updates.length; i++) {
      updates[i].createdAtTimeAgo = formatToTimeAgo(
        updates[i].createdAt,
        $firebase,
        timeAgo,
        $t
      );
    }
  }

  let alert = getDefaultAlertValues();
  let db;

  onMount(async () => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(nl);
    timeAgo = new TimeAgo($locale);
    db = await $firebase.firestore();
  });

  async function changeStatus(checkStatus, changeStatus) {
    if (connection.status === checkStatus) {
      let serverTimestamp = $firebase.firestore.Timestamp.now().seconds;
      let data = {
        status: changeStatus,
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
      };

      switch (changeStatus) {
        case "in-trash":
          data.inTrashAt = serverTimestamp;
          break;
        case "needs-work":
          data.inNeedsWorkAt = serverTimestamp;
          break;

        case "in-progress":
          data.inProgressAt = serverTimestamp;
          break;

        case "needs-approval":
          data.inNeedsForApprovalAt = serverTimestamp;
          break;

        case "published":
          data.publishedAt = serverTimestamp;
          break;
      }
      await db.collection("connections").doc(connection.id).update(data);
      connection.status = changeStatus;
      await createStatusUpdate();
    }
  }

  async function createStatusUpdate() {
    if ($user && $player.curriculumProfileId) {
      let data = {
        type: "status-change-by-user",
        content: connection.status,
        authorId: $user.uid,
        createdAt: $firebase.firestore.Timestamp.now().seconds,
        connectionId: connection.id,
        connectionSourceId: connection.sourceId,
        connectionLinkId: connection.linkId,
        connectionType: connection.type,
        connectionSourceType: connection.sourceType,
        connectionLinkType: connection.linkType,
      };

      data.curriculumProfile = await getCurriculumProfile(
        db,
        $player.curriculumProfileId
      );

      alert = getDefaultAlertValues();
      try {
        let updatesColRef = db.collection("updates");
        let result = await updatesColRef.add(data);
        alert.success = true;
        alert.successTitle = $t("status-update-created");
        alert.successMessage = "id: " + result.id;
        // updates = [...updates, data];
      } catch (e) {
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function createCommentUpdate() {
    if ($user) {
      let isTeacher = $user.uid === connection.authorId;

      let curriculumProfileData = {};
      let data = {};
      if (hasCurriculumProfile) {
        curriculumProfileData = await getCurriculumProfile(
          db,
          $player.curriculumProfileId
        );
      }

      if (isTeacher) {
        data = {
          type: "comment-teacher",
          content: newCommentText,
          authorId: $user.uid,
          createdAt: $firebase.firestore.Timestamp.now().seconds,
          connectionId: connection.id,
          connectionSourceId: connection.sourceId,
          connectionLinkId: connection.linkId,
          connectionType: connection.type,
          connectionSourceType: connection.sourceType,
          connectionLinkType: connection.linkType,
          curriculumProfile: curriculumProfileData,
        };

        if (hasCurriculumProfile) {
          data.curriculumProfile = curriculumProfileData;
        }
      } else if (hasCurriculumProfile) {
        data = {
          type: "comment",
          content: newCommentText,
          connectionId: connection.id,
          connectionSourceId: connection.sourceId,
          connectionLinkId: connection.linkId,
          connectionType: connection.type,
          connectionSourceType: connection.sourceType,
          connectionLinkType: connection.linkType,
          curriculumProfile: curriculumProfileData,
          createdAt: $firebase.firestore.Timestamp.now().seconds,
        };
      }

      if (isTeacher || hasCurriculumProfile) {
        alert = getDefaultAlertValues();
        try {
          let updatesColRef = db.collection("updates");
          let result = await updatesColRef.add(data);
          alert.success = true;
          alert.successTitle = $t("reaction-placed");
          alert.successMessage = "id: " + result.id;
          // updates = [...updates, data];
        } catch (e) {
          alert.error = true;
          alert.errorCode = e.code;
          alert.errorMessage = e.message;
        }
      }
    }
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createCommentUpdate();
    newCommentText = "";
    setTimeout(() => {
      if (hasCurriculumProfile || isTeacher) {
        buttonDisabled = false;
      }
    }, 5000);
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
    crossorigin="anonymous"
  />
</svelte:head>

<ResultFeedback bind:alert />
<CheckPlayerHasProfile bind:hasCurriculumProfile />

{#if connection}
  <div class="mt-8">
    <slot />
    <div class="flex">
      <div class="ml-auto mt-4">
        {#if !connection.archive}
          {#if connection.status === "needs-work"}
            <Button
              color="primary"
              on:click={() => changeStatus("needs-work", "published")}
              isDisabled={!hasCurriculumProfile}
              content={$t("activity-publish")}
            />
          {/if}
          {#if connection.status === "published"}
            <Button
              on:click={() => changeStatus("published", "needs-work")}
              isDisabled={!hasCurriculumProfile}
              content={$t("activity-unpublish-action")}
            />
          {/if}
        {/if}
      </div>
    </div>
  </div>

  {#if updatesReceived}
    <Feeds bind:updates />
  {/if}

  <div class="max-w-lg mx-auto px-6 mt-12 mb-32">
    <form on:submit|preventDefault={formSubmit}>
      <FormField title={$t("reaction")} forId="comment" labelPosition="top">
        <Textarea id="comment" rows="3" bind:value={newCommentText} />
        <svelte:fragment slot="after">
          <div class="mt-3">
            <div class="flex justify-between mt-4">
              <AdditionalFormText
                content={$t("keep-it-friendly-and-professional")}
              />
              <Button
                isDisabled={buttonDisabled}
                color="primary"
                isSubmit={true}
                content={$t("place-reaction")}
                dataTest="post-reaction-button"
              />
            </div>
          </div>
        </svelte:fragment>
      </FormField>
    </form>
  </div>
{/if}
