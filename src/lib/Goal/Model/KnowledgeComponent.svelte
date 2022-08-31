<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  
  import { t } from "svelte-intl-precompile";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import {
    getAlgoliaSearchClient,
    getConnectionIndex,
  } from "$lib/Internals/Algolia/algolia";
  import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
  import "@algolia/autocomplete-theme-classic";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import { page } from "$app/stores";

  export let hasCurriculumProfile;
  export let knowledgeComponent;
  export let index;
  export let model;
  let filters = "";
  export let activeActivityForm = false;

  let connectionIndex = getConnectionIndex($page.data.session.environment);
  let autoCompleteElementExists = null;
  let autoCompleteTimer;

  onMount(async () => {
    initializeAutocomplete();
  });

  const dispatch = createEventDispatcher();

  function resetFilters() {
    filters = "type:goal-activity" + " AND sourceId:" + model.goalId;
    for (let i = 0; i < knowledgeComponent.activities.length; i++) {
      filters += " AND NOT linkId:" + knowledgeComponent.activities[i].id;
    }
  }

  function splitKC(i) {
    dispatch("splitKC", { i: i });
  }

  function addActivity(connectionGoalActivity) {
    knowledgeComponent.activities = [
      ...knowledgeComponent.activities,
      {
        connectionId: connectionGoalActivity.id,
        activityId: connectionGoalActivity.linkId,
        title: connectionGoalActivity.title,
      },
    ];
    model.statesKCArray = model.statesKCArray;
    resetFilters();
  }

  function newActivity() {
    dispatch("newActivity");
  }

  function initializeAutocomplete() {
    const searchClient = getAlgoliaSearchClient();
    resetFilters();
    autocomplete({
      container: "#autocomplete-activities-" + index,
      placeholder: $t("add-activity-to-knowledge-component"),
      onSubmit({ state }) {
        console.log(state);
      },
      getSources({ query }) {
        return [
          {
            sourceId: connectionIndex,
            onSelect({ state, item }) {
              addActivity(item);
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: connectionIndex,
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                    filters: filters,
                  },
                ],
              });
            },
            templates: {
              item({ item }) {
                return item.title;
              },
              noResults() {
                return $t("no-activities-found");
              },
            },
          },
        ];
      },
    });
  }

  function editActivity(activityIndex) {
    dispatch("editActivity", {activityIndex});
  }

  function removeActivity(event) {
    knowledgeComponent.activities.splice(event.detail.i, 1);
    knowledgeComponent.activities = knowledgeComponent.activities;
    resetFilters();
  }
</script>

<div
  class="ml-auto mr-auto border-2  bg-white px-6 py-5 shadow-sm items-center"
  class:border-green-500={!activeActivityForm}
  class:border-blue-500={activeActivityForm}
>
  <div class="flex">
    <div>
      {#if knowledgeComponent.label}
        <label
          for="state-kc-{index}"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {knowledgeComponent.label}
        </label>
      {/if}
      <Button
        content={$t("add")}
        isDisabled={!hasCurriculumProfile}
        size="tiny"
        on:click={() => splitKC(index)}
      />
    </div>
    <Textarea
      id="state-kc-{index}"
      bind:value={knowledgeComponent.abstract}
      rows="2"
    />
  </div>
  <div class="mt-4">
    <div
      class="sm:grid sm:grid-cols-3 space-between justify-items-start items-center"
    >
      <h3 class="text-base font-medium col-span-2 text-gray-900">
        {$t("activities")}
      </h3>
      <Button
        extraClasses={["justify-self-end"]}
        color="primary"
        size="very-small"
        content={$t("new")}
        isDisabled={!hasCurriculumProfile}
        on:click={newActivity}
      />
    </div>
    <TextAndRemove
      items={knowledgeComponent.activities}
      on:remove={removeActivity}
      isDisabled={!hasCurriculumProfile}
    >
      <svelte:fragment let:item={activity} slot="show">
        <a href="/activiteit/{activity.activityId}?redirect=/leerdoel/{model.goalId}/activiteiten/{activity.activityId}" class="underline" target="_blank"
          >{activity.title}</a
        >
      </svelte:fragment>

      <svelte:fragment slot="extra-actions" let:i={activityIndex}>
        <Button
          size="very-small"
          color="secondary"
          isDisabled={!hasCurriculumProfile}
          content={$t("edit")}
          on:click={() => editActivity(activityIndex)}
        />
      </svelte:fragment>
    </TextAndRemove>
    <div id="autocomplete-activities-{index}" class="max-w-lg mt-2" />
  </div>
</div>
