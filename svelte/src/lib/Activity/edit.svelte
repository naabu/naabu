<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import ActivityForm from "./form.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import ResultFeedback from "$lib/Form/resultFeedback.svelte";
  import { getActivitySaveData } from "./helper";

  let y;
  export let ref;
  let snap;
  let activity;

  let breadcrumbs = [
    {
      url: "/beheer",
      value: "Beheer",
    },
    {
      url: "/beheer/activiteit",
      value: "Activiteit",
    },
    {
      url: "/beheer/activiteit/" + $page.params.id + "/wijzigen",
      value: "Activiteit wijzigen",
    },
  ];

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

  onMount(async () => {
    snap = await ref.get();
    if (snap.exists) {
      activity = snap.data();
      if (!activity.quizzes && activity.quizes) {
        activity.quizzes = activity.quizes;
      }
      if (!activity.difficulty) {
        activity.difficulty = 1;
      }
      if (!activity.type) {
        activity.type = "";
      }
      if (!activity.svg) {
        activity.svg = "";
      }
    }
  });

  async function edit() {
    let data = getActivitySaveData(activity);
    alert = getDefaultAlertValues();
    try {
      await ref.update(data);
      alert.success = true;
      alert.successTitle = "Activiteit gewijzigd";
      // TODO: check out why there is no result?
      alert.successMessage = "id: " + ref.id;
    } catch (e) {
      console.error("Error adding documfent: ", e);
      alert.error = true;
      alert.errorCode = e.code;
      alert.errorMessage = e.message;
    }
    y = 0;
  }

  async function formSubmit(event) {
    await edit();
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

<svelte:window bind:scrollY={y} />

{#if activity}
  <div>

    <ResultFeedback bind:alert />
    <div>
      <p class="ml-2 mt-1 text-sm text-gray-500 truncate">in Engineering</p>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <div>
            <p class="max-w-2xl text-sm text-gray-500">
              {#if activity.status === "draft"}
              Maak hier elke soort activiteit, bijvoorbeeld een uitleg video of
              quiz.
              {:else}
              Wijzig hier je activiteit
              {/if}
            </p>
          </div>
        </div>
      </div>
    </div>
    <form
      class="space-y-8 divide-y divide-gray-200"
      on:submit|preventDefault={formSubmit}
    >
      <ActivityForm bind:activity />

      <div class="">
        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="submit"
              class="float-right ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Concept opslaan en bekijken
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
{/if}
