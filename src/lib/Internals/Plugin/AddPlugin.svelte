<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import PluginSelector from "$lib/Internals/Plugin/Selector.svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  
  const dispatch = createEventDispatcher();
  export let showPluginSelector = false;

  function addPlugin(event) {
    dispatch("addPlugin", event.detail);
  }
</script>

<PluginSelector bind:toggle={showPluginSelector} on:add={addPlugin} />

<FormField>
  <Button 
  dataTest = "add-plugin-button"
  content={$t("add-plugin-button")} on:click={() => (showPluginSelector = true)} />
</FormField>
