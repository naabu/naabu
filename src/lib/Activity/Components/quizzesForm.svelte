<script>
  import Button from "$lib/Internals/Button/Button.svelte";

  import VerwijderDialog from "$lib/Internals/Misc/dialog.svelte";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import Checkbox from "../../Internals/FormFields/Checkbox.svelte";
  import Select from "../../Internals/FormFields/Select.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";

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

  function setSelectedQuizIndex(index) {
    selectedQuizIndex = index;
    selectedFieldIndex = -1;
    renderedKatex = "";
  }

  function setSelectedFieldIndex(index) {
    selectedFieldIndex = index;
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
</script>

<VerwijderDialog bind:toggle={deleteQuizToggle} on:ok={deleteQuiz} />
<div class="space-y-3 sm:space-y-2">
  <div>
    <div class="block tabs">
      <div class="border-b mb-3 border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {#each quizzes as quiz, i}
            {#if selectedQuizIndex !== i}
              <button
                on:click|preventDefault={() => setSelectedQuizIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Vraag {i + 1}
              </button>
            {:else}
              <button
                on:click|preventDefault={() => setSelectedQuizIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Vraag {i + 1}
              </button>
            {/if}
          {/each}
          <div class="mt-3 mb-1">
            <Button
              on:click={addQuiz}
              dataTest="add-question-button"
              content="Nieuwe vraag"
              size="small"
            />
          </div>
        </nav>
        {#if quizzes.length > 0}
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            {#if selectedFieldIndex !== -1}
              <button
                on:click|preventDefault={() => setSelectedFieldIndex(-1)}
                class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Vraag
              </button>
            {:else}
              <button
                on:click|preventDefault={() => setSelectedFieldIndex(-1)}
                class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Vraag
              </button>
            {/if}

            {#each quizzes[selectedQuizIndex].answers as answer, i}
              {#if selectedFieldIndex !== i}
                <button
                  data-test="A{i + 1}"
                  on:click|preventDefault={() => setSelectedFieldIndex(i)}
                  class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Antwoord {i + 1}
                  {#if quizzes[selectedQuizIndex].answers[i].correct}
                    *
                  {/if}
                </button>
              {:else}
                <button
                  on:click|preventDefault={() => setSelectedFieldIndex(i)}
                  class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Antwoord {i + 1}
                  {#if quizzes[selectedQuizIndex].answers[i].correct}
                    *
                  {/if}
                </button>
              {/if}
            {/each}

            <div class="mt-3 mb-1 ">
              <Button
                dataTest="new-answer-button"
                on:click={() => addAnswer(selectedQuizIndex)}
                content="Nieuw antwoord"
                size="small"
              />
            </div>
            <div class="mt-3 mb-1 ">
              <Button
                dataTest="remove-quiz-button"
                on:click={removeQuizButtonFunction}
                content="Vraag verwijderen"
                size="small"
              />
            </div>
          </nav>
        {/if}
      </div>
    </div>

    {#if quizzes.length > 0}
      {#if selectedFieldIndex === -1}
        {#if showTimeInVideo}
          <FormField
            title="Tijd in video"
            id="quiz_video_time"
            labelPosition="top"
          >
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
                on:click={() =>
                  updatePreview(quizzes[selectedQuizIndex].question)}
                content="Update preview"
              />
            </div>
            <div class="mt-3">{@html renderedKatex}</div>
          </svelte:fragment>
        </FormField>
      {:else}
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
  </div>
</div>
