<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  export let data = {};

  if (!data.number) {
    data.number = "5";
  }

  // import { data } from "$lib/Internals/Plugin/plugin-store.js";
  // $: if (number) {
  //   data.set({ number: number });
  // }
</script>

<FormField labelPosition="top" title="NumberInput label">
  <NumberInput bind:value={data.number} step="0.5" />
</FormField>
