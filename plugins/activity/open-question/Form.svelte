<script>
  import Button from "$lib/Internals/Button/Button.svelte";

  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";

  export let data;

  $: if (!data.question) {
    data.question = "";
  }
  $: if (!data.correctAnswers) {
    data.correctAnswers = [];
  }
  let newCorrectAnswer = "";

  function addCorrectAnswer() {
    if (newCorrectAnswer.trim().length > 0) {
      data.correctAnswers = [...data.correctAnswers, newCorrectAnswer];
      newCorrectAnswer = "";
    }
  }

  function removeCorrectAnswer(event) {
    data.correctAnswers.splice(event.detail.i, 1);
    data.correctAnswers = data.correctAnswers;
  }
</script>

<FormField title={$t("question")} forId="question-input">
  <Textarea id="question-input" rows="3" bind:value={data.question} />
</FormField>
<FormField title={$t("correct-answers")} forId="correct-answer">
  <TextAndRemove
    bind:items={data.correctAnswers}
    noItemsMessage={$t("please-add-a-correct-answer")}
    on:remove={removeCorrectAnswer}
  />

  <TextInput bind:value={newCorrectAnswer} id="correct-answer" />

  <Button
    size="small"
    on:click={addCorrectAnswer}
    content={$t("add-correct-answer")}
  />
</FormField>
