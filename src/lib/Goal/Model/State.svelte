<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import { t } from "svelte-intl-precompile";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let stateKC;
  export let index;
  export let model;

  function deleteState(i) {
    dispatch("deleteState", { i: i });
  }
</script>

<div
  class="w-fit border-gray-300 rounded-lg border-2 bg-white px-6 py-5 shadow-sm flex items-center space-x-3"
>
  <div>
    {#if stateKC.label}
      <label
        for="state-kc-{index}"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {stateKC.label}
      </label>
    {/if}
    {#if index > 0 && index < model.statesKCArray.length - 1}
      <Button
        content={$t("remove")}
        size="tiny"
        on:click={() => deleteState(index)}
      />
    {/if}
  </div>
  <Textarea id="state-kc-{index}" bind:value={stateKC.abstract} rows="2" />
</div>
