<script>
  import Transition from "svelte-class-transition";
  import { t } from "svelte-intl-precompile";
  import ActivityForm from "$lib/Activity/Components/form.svelte";
  import { getDefaultEmptyActivity } from "$lib/Activity/Components/helper";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  
  import { user, player } from "$lib/Internals/User/store";
  export let toggle = false;
  export let showPluginSelector = true;
  export let activity;
  export let goal;
  export let model;
  export let reset = false;
  let userChangedTitle = false;

  export let knowledgeComponent;

  let slideOverTitle = $t("add-new-activity-to-model");

  let knowledgeComponentText = "";
  $: if (knowledgeComponent) {
    knowledgeComponentText = knowledgeComponent.abstract;
  }

  $: if (activity && goal) {
    activity.goalId = goal.id;
    activity.goalTitle = goal.title;
  }

  $: if ((!activity) && model && knowledgeComponent && $player) {
    activity = getDefaultEmptyActivity(getDefaultTitle());
  }

  $: if (reset) {
    if (!userChangedTitle) {
      activity.title = getDefaultTitle();
    }
    reset = false;
  }

  function getDefaultTitle() {
    let defaultTitle = knowledgeComponentText;
    return defaultTitle;
  }

  function closeForm() {
    toggle = false;
    showPluginSelector = false;
  }
</script>

<!-- Background backdrop, show/hide based on slide-over state. -->
<div class="fixed inset-y-0 right-0 max-w-3xl flex z-10">
  <Transition
    {toggle}
    inTransition="transform transition ease-in-out duration-500 sm:duration-700"
    inState="translate-x-full"
    onState="translate-x-0"
    outTransition="transform transition ease-in-out duration-500 sm:duration-700"
    outState="translate-x-full"
  >
    <div class="pointer-events-auto w-screen max-w-3xl">
      <div
        class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <div>
              <h2
                class="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                {slideOverTitle}
              </h2>
              <AdditionalFormText content={knowledgeComponentText} />
            </div>
            <div class="ml-3 flex h-7 items-center">
              <button
                type="button"
                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                on:click={closeForm}
              >
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="relative mt-6 flex-1 px-4 sm:px-6">
          {#if activity}
            <ActivityForm bind:activity showGoalForm={false} bind:userChangedTitle />
          {/if}
        </div>
      </div>
    </div>
  </Transition>
</div>
