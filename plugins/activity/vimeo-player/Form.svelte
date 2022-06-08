<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import { t } from "svelte-intl-precompile";
  export let data = {};
  
  if (!data.video) {
    data.video = {};
  }
</script>

<FieldSet title={$t("video")} description={$t("video-related-info")}>
  <FormField title={$t("vimeo")} forId="vimeo_id">
    <NumberInput id="vimeo_id" bind:value={data.video.vimeoId} />
  </FormField>
</FieldSet>
