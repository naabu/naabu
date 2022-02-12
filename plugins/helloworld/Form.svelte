<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  export let data = {};
</script>

<FormField title="TextInput label">
  <TextInput bind:value={data.name} />
</FormField>
