<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import { t } from "svelte-intl-precompile";
  export let data;

  $: if (!data) {
    data = {};
  }
</script>

<FormField title={$t("time-in-video")} forId="video_time" labelPosition="top">
  <NumberInput
    id="video_time"
    step="0.1"
    bind:value={data.timeInVideo}
  />
</FormField>
