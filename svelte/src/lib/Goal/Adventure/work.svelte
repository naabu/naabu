<script>
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import { getStores, session } from "$app/stores";
  import { comment } from "postcss";
  import { onMount } from "svelte";
  import { sortOnCreatedAt } from "$lib/Revision/helper";
  import { formatToTimeAgo } from "$lib/Misc/helper";
  import MainTabs from "$lib/Tabs/goal.svelte";
  export let firebase;
  export let goal;
  export let adventureRef;
  let adventure;
  let newCommentText;
  let buttonDisabled = false;
  let db;
  let timeAgo;

  $: if (adventure && adventure.updates) {
    sortOnCreatedAt(adventure.updates);
    adventure.updates.reverse();
  }

  let alert = getDefaultAlertValues();
  onMount(async () => {
    TimeAgo.addLocale(nl);
    timeAgo = new TimeAgo("nl");
    db = await firebase.firestore();
    let adventureSnap = await adventureRef.get();
    if (adventureSnap.exists) {
      adventure = adventureSnap.data();
      adventure.id = adventureRef.id;

      adventure.updates = [];
      let updatesCol = adventureRef.collection("updates");
      const querySnapshot = await updatesCol.get();
      querySnapshot.forEach((updateDoc) => {
        let updateObject = updateDoc.data();
        updateObject.id = updateDoc.id;
        adventure.updates = [...adventure.updates, updateObject];
      });
    }
  });

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  function getStatusText(status) {
    switch (status) {
      case "published":
        return "Gepubliceerd";
      case "needs-approval":
        return "Goedkeuring nodig";
      case "in-progress":
        return "In uitvoering";
      case "needs-work":
        return "Heeft werk nodig";
      case "in-trash":
        return "In prullenbak";
    }
  }

  function getTypeText(theType) {
    switch (theType) {
      case "explanation":
        return "Uitleg";
      case "practice":
        return "Oefening";
      case "boss":
        return "Eindbaas";
    }
  }
  async function createStatusUpdate() {
    if ($session.player && $session.player.id) {
      let data = {
        type: "status-change-by-user",
        content: adventure.status,
        authorId: $session.player.id,
        createdAt: firebase.firestore.Timestamp.now().seconds
      };

      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.player.id);

      let snap = await profileRef.get();
      if (snap.exists) {
        let profileData = snap.data();
        data.curriculumProfile = {
          fullname: profileData.fullname,
          institution: profileData.institution,
        };
      }
      alert = getDefaultAlertValues();
      try {
        let updatesColRef = adventureRef.collection("updates");
        let result = await updatesColRef.add(data);
        alert.success = true;
        alert.successTitle = "Status update gemaakt";
        alert.successMessage = "id: " + result.id;
        adventure.updates = [...adventure.updates, data];
      } catch (e) {
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function setToNeedsApproval() {
    if (adventure.status === "in-progress") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "needs-approval",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        inNeedsForApprovalAt: serverTimestamp,
      });
      adventure.status = "needs-approval";
      await createStatusUpdate();
    }
  }
  async function publishAdventure() {
    if (adventure.status === "needs-approval") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "published",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        publishedAt: serverTimestamp,
      });
      adventure.status = "published";
      await createStatusUpdate();
    }
  }
  async function adventureNeedsWOrk() {
    if (adventure.status === "needs-approval") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "needs-work",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        inNeedsWorkAt: serverTimestamp, 
      });
      adventure.status = "needs-work";
      await createStatusUpdate();
    }
  }

  async function startWork() {
    if (adventure.status === "needs-work") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "in-progress",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        inProgressAt: serverTimestamp,
      });
      adventure.status = "in-progress";
      await createStatusUpdate();
    }
  }

  async function unpublish() {
    if (adventure.status === "published") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "needs-work",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        inNeedsWorkAt: serverTimestamp,
      });
      adventure.status = "needs-work";
      await createStatusUpdate();
    }
  }

  async function deleteAdventure() {
    if (adventure.status === "needs-work") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "in-trash",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        inTrashAt: serverTimestamp,
      });
      adventure.status = "in-trash";
      await createStatusUpdate();
    }
  }

  async function putBackOutTrash() {
    if (adventure.status === "in-trash") {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      await adventureRef.update({
        status: "needs-work",
        modifiedAt: serverTimestamp,
        lastUpdatesAt: serverTimestamp,
        inNeedsWorkAt: serverTimestamp, 
      });
      adventure.status = "needs-work";
      await createStatusUpdate();
    }
  }

  async function createCommentUpdate() {
    if ($session.player && $session.player.id) {
      let data = {
        type: "comment",
        content: newCommentText,
        authorId: $session.player.id,
        createdAt: firebase.firestore.Timestamp.now().seconds,
      };

      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.player.id);

      let snap = await profileRef.get();
      if (snap.exists) {
        let profileData = snap.data();
        data.curriculumProfile = {
          fullname: profileData.fullname,
          institution: profileData.institution,
        };
      }
      alert = getDefaultAlertValues();
      try {
        let updatesColRef = adventureRef.collection("updates");
        let result = await updatesColRef.add(data);
        let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
        let adventureData = {
          lastUpdatesAt: serverTimestamp
        }
        if (adventure.status === 'in-progress') {
          adventureData.inProgressAt = serverTimestamp;
        }
        else if(adventure.status === 'needs-approval') {
          adventureData.inNeedsForApprovalAt = serverTimestamp;
        }
        console.log(adventureData);
        await adventureRef.update(adventureData);
        alert.success = true;
        alert.successTitle = "Opmerking gemaakt";
        alert.successMessage = "id: " + result.id;
        data.createdAt = firebase.firestore.Timestamp.now().seconds;
        adventure.updates = [...adventure.updates, data];
      } catch (e) {
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createCommentUpdate();
    console.log(newCommentText);
    setTimeout(() => {
      buttonDisabled = false;
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

<MainTabs bind:goal mainSelected="adventures" />
{#if adventure}
  <div class="mt-8">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Avontuur informatie
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {adventure.title}
        </p>
        <div class="flex">
          <a
            href="/leerdoel/{goal.id}/avontuur/{adventure.id}/bekijken"
            class="ml-auto font-medium text-indigo-600 hover:text-indigo-500"
          >
            Bekijken
          </a>
        </div>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Moeilijkheid</dt>
            <dd class="mt-1 text-sm text-gray-900">{adventure.difficulty}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {getStatusText(adventure.status)}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Docent</dt>
            <dd class="mt-1 text-sm text-gray-900">TODO!</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Type</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {getTypeText(adventure.type)}
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Omschrijving</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {@html adventure.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="flex">
      <div class="ml-auto mt-4">
        {#if adventure.status === "in-progress"}
          <button
            on:click={setToNeedsApproval}
            class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Avontuur klaar om te publiceren
          </button>
        {/if}
        {#if adventure.status === "needs-approval"}
          <button
            on:click={adventureNeedsWOrk}
            class="mt-3bg-white py-2 ml-3 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <!-- TODO set reason -->
            Heeft werk nodig
          </button>
          <button
            on:click={publishAdventure}
            class="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Avontuur publiceren
          </button>
        {/if}
        {#if adventure.status === "needs-work"}
          <button
            on:click={deleteAdventure}
            class=" mt-3bg-white py-2 ml-3 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Avontuur in prullenbak
            <!-- TODO set reason -->
          </button>
          <button
            on:click={startWork}
            class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Aan avontuur werken
          </button>
        {/if}
        {#if adventure.status === "published"}
          <button
            on:click={unpublish}
            class="mt-3bg-white py-2 ml-3 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Avontuur publicatie ongedaan maken
            <!-- TODO set reason -->
          </button>
        {/if}
        {#if adventure.status === "in-trash"}
          <button
            on:click={putBackOutTrash}
            class=" mt-3bg-white py-2 ml-3 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Avontuur terugzetten
            <!-- TODO set reason -->
          </button>
        {/if}
      </div>
    </div>
  </div>

  {#if adventure && adventure.updates}
    <div class="max-w-lg mx-auto px-6 mt-16">
      <div class="flow-root">
        <ul role="list" class="-mb-8">
          {#each adventure.updates as update, i}
            <li>
              <div class="relative pb-8">
                {#if i + 1 !== adventure.updates.length}
                  <span
                    class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                {/if}
                <div class="relative flex items-start space-x-3">
                  {#if update.type === "comment"}
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
                        <!-- Heroicon name: solid/chat-alt -->
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
                            href="/curriculum-profiel/{update.authorId}"
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
                          <!-- Heroicon name: solid/user-circle -->
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
                      <div class="text-sm text-gray-500">
                        <a
                          href="/curriculum-profiel/{update.authorId}"
                          class="font-medium text-gray-900"
                          >{update.curriculumProfile.fullname}</a
                        >
                        heeft de status gewijzigd naar
                        <span class="font-medium text-gray-900"
                          >{update.content}</span
                        >
                        <span class="whitespace-nowrap"
                          >{formatToTimeAgo(
                            update.createdAt,
                            firebase,
                            timeAgo
                          )}</span
                        >
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
      <div>
        <label for="comment" class="block text-sm font-medium text-gray-700">
          Reageren
        </label>
        <div class="mt-1">
          <textarea
            id="comment"
            name="comment"
            rows="3"
            bind:value={newCommentText}
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div class="mt-4">
          <span class=" text-sm text-gray-500">
            Hou het vriendelijk en proffesioneel
          </span>
          <button
            disabled={buttonDisabled}
            type="submit"
            class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Reactie sturen</button
          >
        </div>
      </div>
    </form>
  </div>
{/if}
