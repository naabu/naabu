<script>
  import "@algolia/autocomplete-theme-classic";
  import LocationForm from "$lib/Module/Components/locationForm.svelte";
  import { formatMapObject } from "$lib/Module/Components/helper";
  import Select from "../../Internals/FormFields/Select.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import { t } from "svelte-intl-precompile";

  export let module;
  export let allMaps;
  export let selectMapOptions = [];

  function compareFunction(value1, value2) {
    if (value1.mapId == value2.mapId) {
      return true;
    }
    return false;
  }

  $: if (allMaps) {
    selectMapOptions = [];
    for (let i = 0; i < allMaps.length; i++) {
      allMaps[i].processed = false;
      selectMapOptions.push({
        value: allMaps[i],
        content: allMaps[i].title,
      });
    }
  }

  function selectChanged(event) {
    module = formatMapObject(module, true, false);
  }
</script>

<FormField title={$t("name")} forId="name">
  <Textarea id="name" required={true} bind:value={module.moduleName} />
</FormField>
<FormField title={$t("description")} forId="description">
  <Textarea id="description" rows="3" bind:value={module.moduleDescription} />
</FormField>
<FormField title={$t("svg-image")} forId="svg">
  <Textarea id="svg" rows="5" bind:value={module.moduleSvg} />
</FormField>
<FormField title={$t("map")} forId="maps">
  <Select
    id="maps"
    bind:value={module.map}
    options={selectMapOptions}
    {compareFunction}
    on:change={selectChanged}
  />
</FormField>
{#if module.locations}
  <FieldSet title={$t("locations")} description={$t("locations-description")}>
    <LocationForm bind:map={module} />
  </FieldSet>
{/if}
