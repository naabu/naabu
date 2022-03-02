<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import PluginSelector from "$lib/Internals/Plugin/Selector.svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  
  export let canBeInterrupted = false;

  const dispatch = createEventDispatcher();
  export let showPluginSelector = false;

  function addPlugin(event) {
    dispatch("addPlugin", event.detail);
  }
</script>

<PluginSelector
  bind:toggle={showPluginSelector}
  filterInterrupt={true}
  on:add={addPlugin}
/>

{#if canBeInterrupted}
<FormField>
  <Button
    content={$t("add-interrupt")}
    on:click={() => (showPluginSelector = true)}
  />
</FormField>
{/if}
