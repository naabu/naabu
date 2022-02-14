<script>

  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  
  export let data = {};

</script>

<FormField labelPosition="top" title="TextInput label">
  <TextInput bind:value={data.name} />
</FormField>
