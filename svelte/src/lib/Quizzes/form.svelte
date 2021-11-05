<script>
  import VerwijderDialog from "$lib/Misc/dialog.svelte";
  import { renderKatexOutput } from "$lib/Misc/helper.js";

  export let quizzes = [];
  export let showTimeInVideo = false;
  export let selectedQuizIndex = 0;
  export let selectedFieldIndex = -1;
  let deleteQuizToggle = false;
  let renderedKatex = "";

  $: if (quizzes.length === 0) {
    addQuiz();
  }

  function updatePreview(input) {
    renderedKatex = renderKatexOutput(input);
  }

  function deleteQuiz() {
    quizzes.splice(selectedQuizIndex, 1);
    quizzes = quizzes;
    selectedQuizIndex = 0;
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
          <button
            class="mt-3 mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={addQuiz}
          >
            Nieuwe vraag
          </button>
        </nav>

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
          {#if quizzes.length > 0}
            {#each quizzes[selectedQuizIndex].answers as answer, i}
              {#if selectedFieldIndex !== i}
                <button
                  data-cy="A{i + 1}"
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
          {/if}
          <button
            data-cy="new-answer-button"
            class="mt-3 mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={() => addAnswer(selectedQuizIndex)}
          >
            Nieuw antwoord
          </button>
          <button
            data-cy="remove-quiz-button"
            class="mt-3 float-right mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={() => removeQuizButtonFunction()}
          >
            Vraag verwijderen
          </button>
        </nav>
      </div>
    </div>

    {#if quizzes.length > 0}
      {#if selectedFieldIndex === -1}
        {#if showTimeInVideo}
          <div class="mt-3">
            <label
              for="quiz_video_time"
              class="mb-1 block text-sm font-medium text-gray-700"
            >
              Tijd in video
            </label>
            <div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  name="quiz_video_time"
                  id="quiz_video_time"
                  class="max-w-xs focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  bind:value={quizzes[selectedQuizIndex].timeInVideo}
                />
              </div>
            </div>
          </div>
        {/if}
        <div class="mt-3">
          <label
            for="quiz_type"
            class="mb-1  block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <div>
            <div>
              <select
                id="quiz_type"
                name="quiz_type"
                class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                bind:value={quizzes[selectedQuizIndex].type}
              >
                <option value="multiple_choice">Multiple choice</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <label
            for="quiz_question"
            class="mb-1  block text-sm font-medium text-gray-700"
          >
            Vraag
          </label>
          <div>
            <textarea
              id="quiz_question"
              name="quiz_question"
              rows="3"
              bind:value={quizzes[selectedQuizIndex].question}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <button
            class="preview-button mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={() =>
              updatePreview(quizzes[selectedQuizIndex].question)}
            >Update preview</button
          >
          <div class="mt-3">{@html renderedKatex}</div>
        </div>
      {:else}
        <div class="mt-3">
          <label
            for="answeranswer"
            class="mb-1 block text-sm font-medium text-gray-700"
          >
            Antwoord
          </label>
          <textarea
            rows="3"
            id="answeranswer"
            bind:value={quizzes[selectedQuizIndex].answers[selectedFieldIndex]
              .answer}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
          <div class="mt-3">
            <input
              bind:checked={quizzes[selectedQuizIndex].answers[
                selectedFieldIndex
              ].correct}
              id="answers_check"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label class="font-medium text-gray-700" for="answers_check"
              >Goed antwoord</label
            >
          </div>
          <button
            class="float-left preview-button mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={() =>
              updatePreview(
                quizzes[selectedQuizIndex].answers[selectedFieldIndex].answer
              )}>Update preview</button
          >
          <button
            data-cy="remove-answer-button"
            type="button"
            on:click|preventDefault={() => deleteQuizAnswer()}
            class="float-right mt-3 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Antwoord verwijderen
          </button>
          <div class="mt-14">{@html renderedKatex}</div>
        </div>
      {/if}
    {/if}
  </div>
</div>
