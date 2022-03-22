<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
import TextInput from "$lib/Internals/FormFields/TextInput.svelte";

  import { t } from "svelte-intl-precompile";

  export let data;

  $: if (!data.question) {
    data.question = "";
  }

  
  $: if (!data.answer) {
    data.answer = "";
  }
</script>

<FormField title={$t("question")} forId="question">
  <Textarea id="question" rows=5 bind:value={data.question} />
</FormField>

<FormField title={$t("answer")} forId="answer">
  <TextInput id="answer" bind:value={data.answer} />
</FormField>
