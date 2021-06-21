<script>
  import VerwijderDialog from "$lib/Misc/dialog.svelte";
  export let quizzes = [];
  $: console.log(quizzes);
  export let showTimeInVideo = false;
  let quizTimeInVideo = null;
  let quizType = "multiple_choice";
  let quizQuestion = null;
  let quizNewAnswer = null;
  let quizNewAnswerCorrect = false;
  let answers = [];
  let testQuestion = null;
  let selectedQuizIndex = 0;
  let selectedFieldIndex = -1;
  let deleteQuizToggle = false;

  function deleteQuiz() {
    quizzes.splice(selectedQuizIndex, 1);
    quizzes = quizzes;
    selectedQuizIndex = 0;
  }

  function deleteQuizAnswer(quizI, answerI) {
    quizzes[quizI].answers.splice(answerI, 1);
    quizzes = quizzes;
  }

  function deleteAnswer(i) {
    quizAnswers.splice(i, 1);
    quizAnswers = quizAnswers;
  }

  function setSelectedQuizIndex(index) {
    selectedQuizIndex = index;
    selectedFieldIndex = -1;
  }

  function setSelectedFieldIndex(index) {
    selectedFieldIndex = index;
  }

  function removeQuizButtonFunction() {
    deleteQuizToggle = true;
  }

  function addQuiz() {
    let quiz = {
      quizTimeInVideo: null,
      quizType: "multiple_choice",
      quizQuestion: null,
      quizNewAnswer: null,
      quizNewAnswerCorrect: false,
      answers: [],
    };
    quizzes = [...quizzes, quiz];
  }

  function addAnswer(quizIndex) {
    let answer = {
      quizNewAnswerCorrect: false,
      quizNewAnswer: null,
    };
    quizzes[quizIndex].answers = [...quizzes[quizIndex].answers, answer];
  }
</script>

<VerwijderDialog bind:toggle={deleteQuizToggle} on:ok={deleteQuiz} />
<div class="pt-8 space-y-3 sm:pt-10 sm:space-y-2">
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">Quiz</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Specificeer vragen en quizjes
    </p>
  </div>

  <div>
    <div class="block tabs">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {#each quizzes as quiz, i}
            {#if selectedQuizIndex !== i}
              <button
                on:click|preventDefault={() => setSelectedQuizIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Q{i + 1}
              </button>
            {:else}
              <button
                on:click|preventDefault={() => setSelectedQuizIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Q{i + 1}
              </button>
            {/if}
          {/each}
          <button
            class="mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={addQuiz}
          >
            New Quiz
          </button>
        </nav>
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          {#if selectedFieldIndex !== -1}
          <button
            on:click|preventDefault={() => setSelectedFieldIndex(-1)}
            class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Question
          </button>
        {:else}
          <button
            on:click|preventDefault={() => setSelectedFieldIndex(-1)}
            class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
          Question
          </button>
        {/if}
          {#each quizzes[selectedQuizIndex].answers as answer, i}
     
            {#if selectedFieldIndex !== i}
              <button
                on:click|preventDefault={() => setSelectedFieldIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                A{i + 1}
              </button>
            {:else}
              <button
                on:click|preventDefault={() => setSelectedFieldIndex(i)}
                class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                A{i + 1}
              </button>
            {/if}
          {/each}
          <button
            class="mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click|preventDefault={() => addAnswer(selectedQuizIndex)}
          >
            New answer
          </button>
          <button
          class="mb-1  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click|preventDefault={() => removeQuizButtonFunction()}
        >
          Remove Quiz
        </button>
        </nav>
      </div>
    </div>
    <!-- {#each quizzes as quiz, i}
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-startsm:pt-5 sm:border-t sm:border-gray-200"
    >
      <label
        for="quiz_video_time_{i}"
        class="block text-sm font-medium text-gray-700"
      >
        Quiz {i + 1} actions:
      </label>
      <button
        type="button"
        on:click|preventDefault={() => deleteQuiz(i)}
        class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Deze quiz verwijderen
      </button>
    </div>
    {#if showTimeInVideo}
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-startsm:pt-5 ">
        <label
          for="quiz_video_time_{i}"
          class="block text-sm font-medium text-gray-700"
        >
          Tijd in video
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              step="0.1"
              name="quiz_video_time_{i}"
              id="quiz_video_time_{i}"
              class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              bind:value={quiz.timeInVideo}
            />
          </div>
        </div>
      </div>
    {/if}
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
      <label
        for="quiz_type_{i}"
        class="block text-sm font-medium text-gray-700"
      >
        Type
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <select
            id="quiz_type_{i}"
            name="quiz_type_{i}"
            class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            bind:value={quiz.type}
          >
            <option value="multiple_choice">Multiple choice</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
      <label
        for="quiz_quistion_{i}"
        class="block text-sm font-medium text-gray-700"
      >
        Vraag
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          id="quiz_question_{i}"
          name="quiz_question_{i}"
          rows="3"
          bind:value={quiz.quistion}
          class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
      <label
        for="quiz_test_question_{i}"
        class="block text-sm font-medium text-gray-700"
      >
        TestVraag
      </label>
      <div class="mt-1 flex rounded-md shadow-sm">
        <input
          type="number"
          name="quiz_test_question_{i}"
          id="quiz_test_question_{i}"
          class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          bind:value={quiz.testQuestion}
        />
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
      <label class="block text-sm font-medium text-gray-700" for="answers_{i}">
        Antwoorden
      </label>
      <div class="mt-3 sm:col-span-2" id="answers_{i}">
        {#each quiz.answers as answer, i2}
          <div class="mt-3 sm:col-span-2">
            <textarea
              rows="3"
              bind:value={answer.answer}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
            <div class="mt-3">
              <input
                bind:checked={answer.correct}
                id = "answers_check_{i}_{i2}"
                type="checkbox"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label class="font-medium text-gray-700" for="answers_check_{i}_{i2}">Goed antwoord</label>
            </div>
            <button
              type="button"
              on:click|preventDefault={() => deleteQuizAnswer(i, i2)}
              class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Antwoord verwijderen
            </button>
          </div>
        {/each}
        <div class="mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              rows="3"
              bind:value={quiz.quizNewAnswer}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />

            <div class="mt-3">
              <input
                id="quiz_answer_correct"
                name="quiz_answer_correct"
                type="checkbox"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                bind:checked={quiz.quizNewAnswerCorrect}
              />
              <label for="quiz_answer_correct" class="font-medium text-gray-700"
                >Goed antwoord</label
              >
            </div>
          </div>
          <button
            type="button"
            on:click|preventDefault={() => addAnswerInExistingQuiz(quiz)}
            class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Antwoord toevoegen
          </button>
        </div>
      </div>
    </div>
  {/each}

  <b>This form is for new quizzes!</b>

  <div
    class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 sm:border-t sm:border-gray-200"
  >
    <label
      for="quiz_video_time"
      class="block text-sm font-medium text-gray-700"
    >
      Tijd in video
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="mt-1 flex rounded-md shadow-sm">
        <input
          type="number"
          step="0.1"
          name="quiz_video_time"
          id="quiz_video_time"
          class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          bind:value={quizTimeInVideo}
        />
      </div>
    </div>
  </div>
  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
    <label for="quiz_type" class="block text-sm font-medium text-gray-700">
      Type
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <select
          id="quiz_type"
          name="quiz_type"
          autocomplete="country"
          class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          bind:value={quizType}
        >
          <option value="multiple_choice">Multiple choice</option>
          <option value="quiz">Quiz</option>
        </select>
      </div>
    </div>
  </div>
  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
    <label for="quiz_quistion" class="block text-sm font-medium text-gray-700">
      Vraag
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <textarea
        id="quiz_question"
        name="quiz_question"
        rows="3"
        bind:value={quizQuestion}
        class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>
  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
    <label
      for="quiz_test_question"
      class="block text-sm font-medium text-gray-700"
    >
      TestVraag
    </label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="number"
        name="quiz_test_question"
        id="quiz_test_question"
        class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
        bind:value={testQuestion}
      />
    </div>
  </div>
  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
    <label class="block text-sm font-medium text-gray-700" for="newanswers"> Antwoorden </label>
    <div class="mt-3 sm:col-span-2" id="newanswers">
      {#each quizAnswers as answer, i}
        <div class="mt-3 sm:col-span-2">
          <textarea
            rows="3"
            bind:value={answer.answer}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
          <div class="mt-3">
            <input
              bind:checked={answer.correct}
              id="new_answer_{i}"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label class="font-medium text-gray-700" for="new_answer_{i}">Goed antwoord</label>
            <button
              type="button"
              on:click|preventDefault={() => deleteAnswer(i)}
              class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Antwoord verwijderen
            </button>
          </div>
        </div>
      {/each}
      <div class="mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            rows="3"
            bind:value={quizNewAnswer}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />

          <div class="mt-3">
            <input
              id="quiz_answer_correct"
              name="quiz_answer_correct"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              bind:checked={quizNewAnswerCorrect}
            />
            <label for="quiz_answer_correct" class="font-medium text-gray-700"
              >Goed antwoord</label
            >
          </div>
        </div>
        <button
          type="button"
          on:click|preventDefault={addAnswer}
          class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Antwoord toevoegen
        </button>
      </div>
    </div>-->
  </div>
</div>
