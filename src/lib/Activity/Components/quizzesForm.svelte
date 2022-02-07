<script>
  import Button from "$lib/Internals/Button/Button.svelte";

  import VerwijderDialog from "$lib/Internals/Misc/dialog.svelte";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import Checkbox from "../../Internals/FormFields/Checkbox.svelte";
  import Select from "../../Internals/FormFields/Select.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";

  export let quizzes = [];
  export let showTimeInVideo = false;
  export let selectedQuizIndex = 0;
  export let selectedFieldIndex = -1;
  let deleteQuizToggle = false;
  let renderedKatex = "";
  let quizSelectOptions = [
    { value: "multiple_choice", content: "Multiple choice" },
    { value: "quiz", content: "Quiz" },
  ];

  function updatePreview(input) {
    renderedKatex = renderKatexOutput(input);
  }

  function deleteQuiz() {
    quizzes.splice(selectedQuizIndex, 1);
    quizzes = quizzes;
    selectedQuizIndex = 0;
    selectedFieldIndex = -1;
  }

  function deleteQuizAnswer() {
    quizzes[selectedQuizIndex].answers.splice(selectedFieldIndex, 1);
    selectedFieldIndex = -1;
    quizzes = quizzes;
  }

  function deleteAnswer(i) {
    quizAnswers.splice(i, 1);
    quizAnswers = quizAnswers;
  }

  $: if (selectedQuizIndex) {
    selectedFieldIndex = -1;
    renderedKatex = "";
  }

  $: if (selectedFieldIndex) {
    renderedKatex = "";
  }

  function removeQuizButtonFunction() {
    deleteQuizToggle = true;
  }

  function addQuiz() {
    let quiz = {
      id: Math.random().toString(36).substring(2, 7),
      answers: [],
    };
    quizzes = [...quizzes, quiz];
    selectedFieldIndex = -1;
    selectedQuizIndex = quizzes.length - 1;
  }

  function addAnswer(quizIndex) {
    let answer = {
      answer: "",
      correct: false,
    };
    quizzes[quizIndex].answers = [...quizzes[quizIndex].answers, answer];
  }

  let questionTabs = [];

  $: if (quizzes) {
    questionTabs = [];
    for (let i = 0; i < quizzes.length; i++) {
      questionTabs.push({
        value: i,
        text: "Vraag " + (i + 1),
      });
    }
  }

  let quizQuestionsAndAnswerOptions = [];

  $: if (quizzes && quizzes[selectedQuizIndex]) {
    quizQuestionsAndAnswerOptions = [];

    quizQuestionsAndAnswerOptions.push({
      value: -1,
      text: "Vraag",
    });
    for (let i = 0; i < quizzes[selectedQuizIndex].answers.length; i++) {
      let answerText = "Antwoord " + (i + 1);
      if (quizzes[selectedQuizIndex].answers[i].correct) {
        answerText += " *";
      }
      quizQuestionsAndAnswerOptions.push({
        value: i,
        text: answerText,
      });
    }

    console.log(quizQuestionsAndAnswerOptions);
  }
</script>

<VerwijderDialog bind:toggle={deleteQuizToggle} on:ok={deleteQuiz} />

<div>
  <Tabs mainTabs={questionTabs} bind:mainSelected={selectedQuizIndex}>
    <svelte:fragment slot="after-main-tabs">
      <Button
        on:click={addQuiz}
        dataTest="add-question-button"
        content="Nieuwe vraag"
        size="small"
      />
    </svelte:fragment>
  </Tabs>

  {#if quizzes.length > 0 && quizzes[selectedQuizIndex]}
    <Tabs
      mainTabs={quizQuestionsAndAnswerOptions}
      bind:mainSelected={selectedFieldIndex}
    >
      <svelte:fragment slot="after-main-tabs">
        <Button
          dataTest="new-answer-button"
          on:click={() => addAnswer(selectedQuizIndex)}
          content="Nieuw antwoord"
          size="small"
        />
        <Button
          dataTest="remove-quiz-button"
          on:click={removeQuizButtonFunction}
          content="Vraag verwijderen"
          size="small"
        />
      </svelte:fragment>
    </Tabs>
  {/if}
</div>

{#if quizzes.length > 0 && quizzes[selectedQuizIndex]}
  {#if selectedFieldIndex === -1}
    {#if showTimeInVideo}
      <FormField title="Tijd in video" id="quiz_video_time" labelPosition="top">
        <NumberInput
          id="quiz_video_time"
          step="0.1"
          bind:value={quizzes[selectedQuizIndex].timeInVideo}
        />
      </FormField>
    {/if}

    <FormField title="Type" id="quiz_type" labelPosition="top">
      <Select
        id="quiz_type"
        bind:options={quizSelectOptions}
        bind:value={quizzes[selectedQuizIndex].type}
        labelOnTop={true}
      />
    </FormField>

    <FormField labelPosition="top" title="Vraag" id="quiz_question">
      <Textarea
        id="quiz_question"
        rows="3"
        bind:value={quizzes[selectedQuizIndex].question}
      />
      <svelte:fragment slot="after">
        <div class="mb-10 mt-3 block">
          <Button
            size="small"
            on:click={() => updatePreview(quizzes[selectedQuizIndex].question)}
            content="Update preview"
          />
        </div>
        <div class="mt-3">{@html renderedKatex}</div>
      </svelte:fragment>
    </FormField>
  {:else if quizzes[selectedQuizIndex].answers[selectedFieldIndex]}
    <FormField labelPosition="top" title="Antwoord" id="answeranswer">
      <Textarea
        id="answeranswer"
        rows="3"
        bind:value={quizzes[selectedQuizIndex].answers[selectedFieldIndex]
          .answer}
      />
    </FormField>
    <Checkbox
      id="answers_check"
      label="Goed antwoord"
      bind:checked={quizzes[selectedQuizIndex].answers[selectedFieldIndex]
        .correct}
    />

    <div class="flex justify-between max-w-lg">
      <div class="mb-10 mt-3 block">
        <Button
          size="small"
          on:click={() =>
            updatePreview(
              quizzes[selectedQuizIndex].answers[selectedFieldIndex].answer
            )}
          content="Update preview"
        />
      </div>

      <div class="mb-10 mt-3 block">
        <Button
          size="small"
          dataTest="remove-answer-button"
          on:click={() => deleteQuizAnswer()}
          content="Antwoord verwijderen"
        />
      </div>
    </div>
    <div class="mt-14">{@html renderedKatex}</div>
  {/if}
{/if}
