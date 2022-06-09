<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import KnowledgeComponent from "$lib/Goal/Model/KnowledgeComponent.svelte";
  import State from "$lib/Goal/Model/State.svelte";
  import { t } from "svelte-intl-precompile";
  export let model;

  function splitKC(event) {
    console.log(event);
    let i = event.detail.i;
    console.log(i);
    model.statesKCArray.splice(
      i + 1,
      0,
      {
        type: "state",
        label: $t("state") + " " + (i + 1) / 2,
        abstract: "",
        example: "",
      },
      {
        type: "kc",
        abstract: "",
        label: $t("knowledge_component") + " " + (i + 3) / 2,
        activities: [],
      }
    );
    model.statesKCArray = model.statesKCArray;
  }

  function deleteState(event) {
    // TODO: Combine KC before and after state.
    model.statesKCArray.splice(event.detail.i, 2);
    model.statesKCArray = model.statesKCArray;
  }
</script>

<FieldSet title={$t("model")} description={$t("model-description")}>
  <FormField title={$t("title")} forId="title-textarea">
    <Textarea bind:value={model.title} id="title-textarea" />
  </FormField>
  <FormField title={$t("description")} forId="description">
    <Textarea id="description" bind:value={model.description} rows="3" />
  </FormField>
  <div class="grid grid-cols-1 justify-items-center gap-14 pt-10">
    {#each model.statesKCArray as stateKC, i}
      <div class="relative w-full" class:max-w-xl={i === 0} class:max-w-sm={i !== 0}>
        {#if stateKC.type === "kc"}
          <KnowledgeComponent
            on:splitKC={splitKC}
            bind:stateKC
            bind:model
            index={i}
          />
        {:else if stateKC.type === "state"}
          <State
            on:deleteState={deleteState}
            bind:model
            bind:stateKC
            index={i}
          />
        {/if}

        {#if i !== model.statesKCArray.length - 1}
          {#if stateKC.type === "kc"}
            <span class="absolute line-short bg-gray-200" aria-hidden="true" />
            <span class="absolute arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="relative stroke-gray-200 arrow-svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          {:else}
            <span class="absolute line bg-gray-200" aria-hidden="true" />
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</FieldSet>

<style>
  .line {
    bottom: -56px;
    height: 56px;
    left: 50%;
    width: 3px;
  }

  .line-short {
    bottom: -46px;
    height: 46px;
    left: 50%;
    width: 3px;
  }

  .arrow {
    bottom: -58px;
    left: 50%;
  }

  .arrow-svg {
    left: -16px;
    width: 35px;
    height: 34px;
  }
</style>
