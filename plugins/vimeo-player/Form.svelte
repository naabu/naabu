<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  export let data = {};
  
  if (!data.video) {
    data.video = {};
  }
</script>

<FieldSet title="Video" description="Specificeer video gerelateerde informatie">
  <FormField title="Vimeo" forId="vimeo_id">
    <NumberInput id="vimeo_id" title="Vimeo" bind:value={data.video.vimeoId} />
  </FormField>
</FieldSet>
