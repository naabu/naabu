<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  export let data = {};
  data.textValue = "Hello world and hello textarea";
</script>

<FormField labelPosition="top" title="Test label">
  <Textarea rows="5" bind:value={data.textValue} />
</FormField>
