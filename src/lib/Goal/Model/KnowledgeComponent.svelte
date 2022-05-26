<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import { getStores, session } from "$app/stores";
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

  export let stateKC;
  export let index;
  export let model;
  $: console.log(model);
  let filters = "";

  let connectionIndex = getConnectionIndex($session.environment);
  let autoCompleteElementExists = null;
  let autoCompleteTimer;

  onMount(async () => {
    initializeAutocomplete();
  });

  const dispatch = createEventDispatcher();

  function resetFilters() {
    filters = "type:goal-activity" + " AND sourceId:" + model.goalId;
    for (let i = 0; i < stateKC.activities.length; i++) {
      filters += " AND NOT linkId:" + stateKC.activities[i].id;
    }
    console.log(filters);
  }

  function splitKC(i) {
    dispatch("splitKC", { i: i });
  }

  function addActivity(connectionGoalActivity) {
    stateKC.activities = [
      ...stateKC.activities,
      {
        id: connectionGoalActivity.linkId,
        title: connectionGoalActivity.title,
      },
    ];
    resetFilters();
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

  function removeActivity(event) {
    stateKC.activities.splice(event.detail.i, 1);
    stateKC.activities = stateKC.activities;
    resetFilters();
  }
</script>

<div
  class="w-fit border-2 border-green-300 bg-white px-6 py-5 shadow-sm items-center space-x-3"
>
  <div class="flex">
    <div>
      {#if stateKC.label}
        <label
          for="state-kc-{index}"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {stateKC.label}
        </label>
      {/if}
      <Button
        content={$t("add")}
        size="tiny"
        on:click={() => splitKC(index)}
      />
    </div>
    <Textarea id="state-kc-{index}" bind:value={stateKC.abstract} rows="2" />
  </div>
  <div class="mt-4">
    <TextAndRemove items={stateKC.activities} on:remove={removeActivity}>
      <svelte:fragment let:item={activity} slot="show">
        <a href="/a/{activity.id}" target="_blank">{activity.title}</a>
      </svelte:fragment>
    </TextAndRemove>
    <div id="autocomplete-activities-{index}" class="max-w-lg mt-2" />
  </div>
</div>
