<script>
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import {
    formatActivityKeys,
    formatActivityValue,
    sortOnCreatedAt,
  } from "$lib/Internals/Revision/helper";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import ArrayDiff from "$lib/Internals/Revision/ArrayDiff.svelte";
  import StringDiff from "$lib/Internals/Revision/StringDiff.svelte";

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

  export let firebase;
  export let goal;
  export let connection;

  let newCommentText;
  let buttonDisabled = true;
  let db;
  let timeAgo;
  let delayDone = false;
  let timer;
  let isTeacher;
  let hasCurriculumProfile;
  let updates = [];
  let updatesReceived;

  $: {
    if ($session.user && connection) {
      isTeacher = $session.user.uid === connection.authorId;
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
        let updatesCol = db
          .collection("updates")
          .where("connectionId", "==", connection.id);
        const querySnapshot = await updatesCol.get();
        querySnapshot.forEach((updateDoc) => {
          let updateObject = updateDoc.data();
          updateObject.id = updateDoc.id;
          updates = [...updates, updateObject];
        });
        sortOnCreatedAt(updates);
        updates = updates.reverse();
        updatesReceived = connection.id;
      }
    }
  })();

  $: if (connection) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (hasCurriculumProfile) {
        delayDone = true;
      }
    }, 5000);
  }

  let alert = getDefaultAlertValues();
  onMount(async () => {
    TimeAgo.addLocale(nl);
    timeAgo = new TimeAgo("nl");
    db = await firebase.firestore();
  });

  async function changeStatus(checkStatus, changeStatus) {
    if (connection.status === checkStatus) {
      delayDone = false;
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
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
    if ($session.user && $session.player.curriculumProfileId) {
      let data = {
        type: "status-change-by-user",
        content: connection.status,
        authorId: $session.user.uid,
        createdAt: firebase.firestore.Timestamp.now().seconds,
        connectionId: connection.id,
      };

      data.curriculumProfile = await getCurriculumProfile(
        db,
        $session.player.curriculumProfileId
      );

      alert = getDefaultAlertValues();
      try {
        let updatesColRef = db.collection("updates");
        let result = await updatesColRef.add(data);
        alert.success = true;
        alert.successTitle = "Status update gemaakt";
        alert.successMessage = "id: " + result.id;
        updates = [...updates, data];
      } catch (e) {
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function createCommentUpdate() {
    if ($session.user) {
      let isTeacher = $session.user.uid === connection.authorId;

      let curriculumProfileData = {};
      let data = {};
      if (hasCurriculumProfile) {
        curriculumProfileData = await getCurriculumProfile(
          db,
          $session.player.curriculumProfileId
        );
      }

      if (isTeacher) {
        data = {
          type: "comment-teacher",
          content: newCommentText,
          authorId: $session.user.uid,
          createdAt: firebase.firestore.Timestamp.now().seconds,
          connectionId: connection.id,
        };

        if (hasCurriculumProfile) {
          data.curriculumProfile = curriculumProfileData;
        }
      } else if (hasCurriculumProfile) {
        data = {
          type: "comment",
          content: newCommentText,
          connectionId: connection.id,
          curriculumProfile: curriculumProfileData,
          createdAt: firebase.firestore.Timestamp.now().seconds,
        };
      }

      if (isTeacher || hasCurriculumProfile) {
        alert = getDefaultAlertValues();
        try {
          let updatesColRef = db.collection("updates");
          let result = await updatesColRef.add(data);
          alert.success = true;
          alert.successTitle = "Reactie geplaats";
          alert.successMessage = "id: " + result.id;
          updates = [...updates, data];
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
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3
          data-test="title-learning-goal-connection-page"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          {#if connection.type === "goal-activity"}
            Koppeling leerdoel activiteit informatie
          {:else}
            Informatie
          {/if}
        </h3>
        <div class="flex">
          {#if connection.type === "goal-activity"}
            <!--Is the owner of the activity-->
            <div class="ml-auto">
              {#if isTeacher}
                <a
                  data-test="edit-activity-page-link"
                  href="/lerarenkamer/activiteit/{connection.linkId}"
                  class="mr-8 font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Activiteit wijzigen
                </a>
              {/if}
              <a
                href="/activiteit/{connection.linkId}?redirect={$page.path}"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Activiteit bekijken
              </a>
            </div>
          {:else}
            <a
              href="/leerdoel/{connection.linkId}"
              class="ml-auto font-medium text-indigo-600 hover:text-indigo-500"
            >
              Leerdoel bekijken
            </a>
          {/if}
        </div>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Titel</dt>
            <dd data-test="field-Titel" class="mt-1 text-sm text-gray-900">
              {connection.title}
            </dd>
          </div>
          {#if connection.fields}
            {#each connection.fields as field}
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">{field.title}</dt>
                <dd
                  data-test="field-{field.title}"
                  class="mt-1 text-sm text-gray-900"
                >
                  {@html field.value}
                </dd>
              </div>
            {/each}
          {/if}
        </dl>
      </div>
    </div>

    <div class="flex">
      <div class="ml-auto mt-4">
        {#if connection.status === "in-progress"}
          <Button
            color="primary"
            isDisabled={!delayDone}
            on:click={() => changeStatus("in-progress", "needs-approval")}
            dataTest="ready-to-publish-button"
            content="Activiteit klaar om te publiceren"
          />
        {/if}
        {#if connection.status === "needs-approval"}
          <Button
            isDisabled={!delayDone}
            on:click={() => changeStatus("needs-approval", "needs-work")}
            content="Heeft werk nodig"
          />
          <Button
            color="primary"
            isDisabled={!delayDone}
            on:click={() => changeStatus("needs-approval", "published")}
            content="Activiteit publiceren"
          />
        {/if}
        {#if connection.status === "needs-work"}
          <Button
            isDisabled={!delayDone}
            on:click={() => changeStatus("needs-work", "in-trash")}
            content="Activiteit in prullenbak"
          />
          <Button
            color="primary"
            isDisabled={!delayDone}
            on:click={() => changeStatus("needs-work", "in-progress")}
            content="Aan activiteit werken"
          />
        {/if}
        {#if connection.status === "published"}
          <Button
            isDisabled={!delayDone}
            on:click={() => changeStatus("published", "needs-work")}
            content="Activiteit publicatie ongedaan maken"
          />
        {/if}
        {#if connection.status === "in-trash"}
          <Button
            color="primary"
            isDisabled={!delayDone}
            on:click={() => changeStatus("in-trash", "needs-work")}
            content="Activiteit terugzetten"
          />
        {/if}
      </div>
    </div>
  </div>

  {#if updates}
    <div class="max-w-lg mx-auto px-6 mt-16">
      <div class="flow-root">
        <ul role="list" class="-mb-8">
          {#each updates as update, i}
            <li>
              <div class="relative pb-8">
                {#if i + 1 !== updates.length}
                  <span
                    class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                {/if}
                <div class="relative flex items-start space-x-3">
                  {#if update.type === "comment-teacher"}
                    <div class="relative">
                      <span
                        class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                      >
                        <!-- <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>  -->
                      </span>
                      <!-- <img
              class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
              src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
            /> -->
                      <!-- <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg> -->
                      <span
                        class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <div class="text-sm">
                          {#if update.curriculumProfile}
                            <a
                              href="/curriculum-profiel/{update
                                .curriculumProfile.id}"
                              class="font-medium text-gray-900"
                              >{update.curriculumProfile.fullname} - Docent</a
                            >
                          {:else}
                            <span class="font-medium text-gray-900">Docent</span
                            >
                          {/if}
                        </div>
                        <p class="mt-0.5 text-sm text-gray-500">
                          {formatToTimeAgo(update.createdAt, firebase, timeAgo)}
                        </p>
                      </div>
                      <div class="mt-2 ">
                        <p data-test="comment-teacher-content-{i}">
                          {update.content}
                        </p>
                      </div>
                    </div>
                  {:else if update.type === "comment"}
                    <div class="relative">
                      <span
                        class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                      >
                        <!-- <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>  -->
                      </span>
                      <!-- <img
                class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt=""
              /> -->
                      <!-- <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg> -->
                      <span
                        class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <div class="text-sm">
                          <a
                            href="/curriculum-profiel/{update.curriculumProfile
                              .id}"
                            class="font-medium text-gray-900"
                            >{update.curriculumProfile.fullname}</a
                          >
                        </div>
                        <p class="mt-0.5 text-sm text-gray-500">
                          {formatToTimeAgo(update.createdAt, firebase, timeAgo)}
                        </p>
                      </div>
                      <div class="mt-2 ">
                        <p>
                          {update.content}
                        </p>
                      </div>
                    </div>
                  {:else if update.type === "status-change-by-user"}
                    <div>
                      <div class="relative px-1">
                        <div
                          class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center"
                        >
                          <svg
                            class="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="min-w-0 flex-1 py-1.5">
                      <div
                        data-test="status-changed-content-{i}"
                        class="text-sm text-gray-500"
                      >
                        <a
                          href="/curriculum-profiel/{update.curriculumProfile
                            .id}"
                          class="font-medium text-gray-900"
                          >{update.curriculumProfile.fullname}</a
                        >
                        heeft de status gewijzigd naar
                        {#if update.content === "in-trash"}
                          <a
                            href="/leerdoel/{goal.id}/avonturen/prullenbak"
                            class="font-medium text-gray-900">Prullenbak</a
                          >
                        {:else if update.content === "needs-work"}
                          <a
                            href="/leerdoel/{goal.id}/avonturen/werk-nodig"
                            class="font-medium text-gray-900"
                            >Heeft werk nodig</a
                          >
                        {:else if update.content === "in-progress"}
                          <a
                            href="/leerdoel/{goal.id}/avonturen/uitvoering"
                            class="font-medium text-gray-900">In uitvoering</a
                          >
                        {:else if update.content === "needs-approval"}
                          <a
                            href="/leerdoel/{goal.id}/avonturen/goedkeuring"
                            class="font-medium text-gray-900"
                            >Goedkeuring nodig</a
                          >
                        {:else if update.content === "published"}
                          <a
                            href="/leerdoel/{goal.id}/avonturen"
                            class="font-medium text-gray-900">Gepubliceerd</a
                          >
                        {:else}
                          <span class="font-medium text-gray-900">
                            {update.content}
                          </span>
                        {/if}
                        <span class="whitespace-nowrap"
                          >{formatToTimeAgo(
                            update.createdAt,
                            firebase,
                            timeAgo
                          )}</span
                        >
                      </div>
                    </div>
                  {:else if update.type === "created-teacher" || update.type === "activity-updated-teacher"}
                    <div>
                      <div class="relative px-1">
                        <div
                          class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center"
                        >
                          <svg
                            class="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="min-w-0 flex-1 py-1.5">
                      <div
                        data-test="connection-write-by-teacher-update-content-{i}"
                        class="text-sm text-gray-500"
                      >
                        {#if update.curriculumProfile}
                          <a
                            href="/curriculum-profiel/{update.curriculumProfile
                              .id}"
                            class="font-medium text-gray-900"
                            >{update.curriculumProfile.fullname}- Docent</a
                          >
                        {:else}
                          <span class="font-medium text-gray-900">Docent</span>
                        {/if}
                        {#if update.type === "created-teacher"}
                          Activiteit gekoppeld met leerdoel
                        {:else}
                          Activiteit is geupdate
                        {/if}

                        <span class="whitespace-nowrap"
                          >{formatToTimeAgo(
                            update.createdAt,
                            firebase,
                            timeAgo
                          )}</span
                        >
                        <div>
                          {#if update.differences}
                            {#each update.differences as difference}
                              {#if difference.type === "string"}
                                <div class="text-gray-900">
                                  <div>
                                    {formatActivityKeys(difference.keys)}
                                    {@html getDiffStrings(
                                      "" +
                                        formatActivityValue(
                                          difference,
                                          difference.oldValue
                                        ),
                                      "" +
                                        formatActivityValue(
                                          difference,
                                          difference.newValue
                                        )
                                    )}
                                  </div>
                                </div>
                              {/if}
                            {/each}
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  <div class="max-w-lg mx-auto px-6 mt-12 mb-32">
    <form on:submit|preventDefault={formSubmit}>
      <FormField title="Reageren" forId="comment" labelPosition="top">
        <Textarea id="comment" rows="3" bind:value={newCommentText} />
        <svelte:fragment slot="after">
          <div class="mt-3">
            <div class="flex justify-between mt-4">
              <AdditionalFormText
                content="Hou het vriendelijk en proffesioneel"
              />
              <Button
                isDisabled={buttonDisabled}
                color="primary"
                isSubmit={true}
                content="Plaats reactie"
                dataTest="post-reaction-button"
              />
            </div>
          </div>
        </svelte:fragment>
      </FormField>
    </form>
  </div>
{/if}
