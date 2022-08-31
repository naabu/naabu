<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import Checkbox from "$lib/Internals/FormFields/Checkbox.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  import sanitizeHtml from 'sanitize-html';

  export let data;

  $: if (!data.answers) {
    data.answers = [];
  }

  export let selectedFieldIndex = -1;
  let renderedKatex = "";

  function updatePreview(input) {
    renderedKatex = renderKatexOutput(input);
  }
  function deleteQuizAnswer() {
    data.answers.splice(selectedFieldIndex, 1);
    selectedFieldIndex = -1;
    data = data;
  }

  $: if (selectedFieldIndex) {
    renderedKatex = "";
  }

  function addAnswer() {
    let answer = {
      answer: "",
      correct: false,
    };
    data.answers = [...data.answers, answer];
  }

  let quizQuestionsAndAnswerOptions = [];

  $: if (data) {
    quizQuestionsAndAnswerOptions = [];

    quizQuestionsAndAnswerOptions.push({
      value: -1,
      text: $t("question"),
    });
    for (let i = 0; i < data.answers.length; i++) {
      let answerText = $t("answer") + " " + (i + 1);
      if (data.answers[i].correct) {
        answerText += " *";
      }
      quizQuestionsAndAnswerOptions.push({
        value: i,
        text: answerText,
        dataTest: "A" + (i + 1),
      });
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
    crossorigin="anonymous"
  />
</svelte:head>

<div>
  {#if data}
    <Tabs
      mainTabs={quizQuestionsAndAnswerOptions}
      bind:mainSelected={selectedFieldIndex}
    >
      <svelte:fragment slot="after-main-tabs" let:mobile>
        <Button
          dataTest={!mobile ? "new-answer-button" : "new-answer-button-mobile"}
          on:click={() => addAnswer()}
          content={$t("new-answer")}
          size="small"
        />
      </svelte:fragment>
    </Tabs>
  {/if}
</div>

{#if data}
  {#if selectedFieldIndex === -1}
    <FormField labelPosition="top" title={$t("question")} forId="quiz_question">
      <Textarea id="quiz_question" rows="3" bind:value={data.question} />
      <svelte:fragment slot="after">
        <div class="mb-10 mt-3 block">
          <Button
            size="small"
            on:click={() => updatePreview(data.question)}
            content={$t("update-preview")}
          />
        </div>
        <div class="mt-3">{@html sanitizeHtml(renderedKatex)}</div>
      </svelte:fragment>
    </FormField>
  {:else if data.answers[selectedFieldIndex]}
    <FormField labelPosition="top" title={$t("answer")} forId="answeranswer">
      <Textarea
        id="answeranswer"
        rows="3"
        bind:value={data.answers[selectedFieldIndex].answer}
      />
    </FormField>
    <Checkbox
      id="answers_check"
      label={$t("correct-answer")}
      bind:checked={data.answers[selectedFieldIndex].correct}
    />

    <div class="flex justify-between max-w-lg">
      <div class="mb-10 mt-3 block">
        <Button
          size="small"
          on:click={() =>
            updatePreview(data.answers[selectedFieldIndex].answer)}
          content={$t("update-preview")}
        />
      </div>

      <div class="mb-10 mt-3 block">
        <Button
          size="small"
          dataTest="remove-answer-button"
          on:click={() => deleteQuizAnswer()}
          content={$t("remove-answer")}
        />
      </div>
    </div>
    <div class="mt-14">{@html sanitizeHtml(renderedKatex)}</div>
  {/if}
{/if}
