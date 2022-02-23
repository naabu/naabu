<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  export let data;

  $: if (!data) {
    data = {};
  }
</script>

<FormField title="Tijd in video" forId="video_time" labelPosition="top">
  <NumberInput
    id="video_time"
    step="0.1"
    bind:value={data.timeInVideo}
  />
</FormField>
