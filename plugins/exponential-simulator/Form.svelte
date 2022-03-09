<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";

  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";

  export let data;

  $: if (!data.question) {
    data.question = "";
  }
</script>

<FormField title={$t("question")} forId="data">
  <TextInput id="question" bind:value={data.question} />
</FormField>
