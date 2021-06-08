<script>
  import { getStores, session, page } from "$app/stores"
  import {onMount} from 'svelte';
  import { getAlgoliaSearchClient, getGoalIndex } from "$lib/algolia";
  import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js'
  import '@algolia/autocomplete-theme-classic';
  import { renderKatexOutput } from "./helper.js";

  export let activity;
  let quizTimeInVideo = null;
  let quizType = "multiple_choice";
  let quizQuestion = null;
  let quizNewAnswer = null;
  let quizNewAnswerCorrect = false;
  let quizAnswers = [];
  let testQuestion = null;

  let filters = "";
  let goalIndex = getGoalIndex($session.environment);

  function updatePreview() {
    activity.description = renderKatexOutput(activity.descriptionRaw);
  }

  function deleteQuiz(i) {
    activity.quizzes.splice(i, 1);
    activity = activity;
  }

  function deleteQuizAnswer(quizI, answerI) {
    activity.quizzes[quizI].answers.splice(answerI, 1);
    activity = activity;
  }

  function deleteAnswer(i) {
    quizAnswers.splice(i, 1);
    quizAnswers = quizAnswers;
  }

  function addQuiz(){
    if (quizQuestion != null && quizQuestion.length > 0)
    {
      let quiz = {
        timeInVideo: quizTimeInVideo,
        type: quizType,
        quistion: quizQuestion,
        answers: quizAnswers,
      }
      if (testQuestion !== null && testQuestion > 0) {
        quiz.testQuestion = testQuestion;
      }
      activity.quizzes = [... activity.quizzes, quiz];
    
      quizTimeInVideo = null;
      quizType = "multiple_choice";
      quizQuestion = null;
      quizNewAnswer = null;
      quizNewAnswerCorrect = false;
      quizAnswers = [];
    }
  }

  function addAnswerInExistingQuiz(quiz){
    if (!quiz.quizNewAnswerCorrect) {
      quiz.quizNewAnswerCorrect = false;
    }
    if (quiz.quizNewAnswer != null && quiz.quizNewAnswer.length > 0)
    {
      let answer = {
        answer: quiz.quizNewAnswer,
        correct: quiz.quizNewAnswerCorrect,
      }
      quiz.answers = [... quiz.answers, answer];
    }
    quiz.quizNewAnswerCorrect = false;
    quiz.quizNewAnswer = null;
    activity = activity;
  }

  function addAnswer(){
    if (quizNewAnswer != null && quizNewAnswer.length > 0)
    {
      let answer = {
        answer: quizNewAnswer,
        correct: quizNewAnswerCorrect,
      }
      quizAnswers = [... quizAnswers, answer];
    }
    quizNewAnswerCorrect = false;
    quizNewAnswer = null;
  }

  function resetFilters() {
    let objectIDsFilter = activity.goals.map(leerdoel => "NOT objectID:" + leerdoel.objectID);
    filters = objectIDsFilter.join(' AND ');
  }

  function addLeerdoel(leerdoel) {
    activity.goals = [... activity.goals, leerdoel];
    resetFilters();
  }

  function removeLeerdoel(i) {
    activity.goals.splice(i, 1);
    activity.goals = activity.goals;
    resetFilters();
  }

  onMount(() => {
    runAutocomplete();
  })

  function runAutocomplete() {
    const searchClient = getAlgoliaSearchClient();
    autocomplete({
      container: '#autocomplete-leerdoelen',
      placeholder: 'Zoek voor leerdoelen',
      onSubmit({state}) {
        console.log(state);
      },
      getSources({ query }) {
        return [
          {
            sourceId: goalIndex,
            onSelect({ state, item }) {
              addLeerdoel(item);
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: goalIndex,
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                    filters: filters,
                  },
                ],
              })
            },
            templates: {
              item({ item }) {
                return item.title;
              },
              noResults() {
                return 'Geen leerdoelen gevonden';
              },
            },
            // ...
          },
        ];
      },
    });
  }
</script>

<style>
  .preview-button {
    display: block;
    margin-bottom: 10px;
  }
  
</style>

<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
  <div>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="title"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Titel
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="title"
            name="title"
            rows="1"
            bind:value={activity.title}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Beschrijving
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="description"
            name="description"
            rows="3"
            bind:value={activity.descriptionRaw}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
          <p class="mt-2 text-sm text-gray-500">
            Beschrijf kort de activiteit of de vraag
          </p>  
          <button class="preview-button mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" on:click|preventDefault={updatePreview}>Update preview</button>
          {#if activity.description}
            {@html activity.description}
          {/if}
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="type"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Type
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="type"
            name="type"
            rows="1"
            bind:value={activity.type}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="difficulty"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Difficulty
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <input
            id="difficulty"
            name="difficulty"
            type="number"
            min="1" max="5"
            bind:value={activity.difficulty}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="svg"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          SVG
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id="svg"
            name="svg"
            rows="5"
            bind:value={activity.svg}
            class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Leerdoelen
    </h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Met welke leerdoelen heeft deze activeit te maken?
    </p>
    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="title"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Gekoppelde leerdoelen
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          {#if activity.goals.length === 0 }
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Nog geen leerdoelen aan activiteit toegevoegd
            </p>
          {:else}
            <ul>
              {#each activity.goals as leerdoel , i}
                <li>{leerdoel.title} <button on:click|preventDefault={() => removeLeerdoel(i)}>Weghalen</button></li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>

    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          for="autocomplete-leerdoelen"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Leerdoel toevoegen
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div id="autocomplete-leerdoelen" class="max-w-lg"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5" >
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Video
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Specificeer video gerelateerde informatie
      </p>
    </div>

    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label for="vimeo_id" class="block text-sm font-medium text-gray-700">
        Vimeo
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 flex rounded-md shadow-sm">
          <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            https://vimeo.com/
          </span>
          <input type="number" name="vimeo_id" id="vimeo_id" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={activity.video.vimeoId} >
        </div>
      </div>
    </div>
  </div>

      
  <div class="pt-8 space-y-3 sm:pt-10 sm:space-y-2" >
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Quiz
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Specificeer vragen en quizjes
      </p>
    </div>

    {#each activity.quizzes as quiz, i}
      <div class = "sm:grid sm:grid-cols-3 sm:gap-4 sm:items-startsm:pt-5 sm:border-t sm:border-gray-200">
        <label for="quiz_video_time_{i}" class="block text-sm font-medium text-gray-700">
          Quiz {i+1} actions:
        </label>
        <button type="button" on:click|preventDefault={() => deleteQuiz(i)} class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Deze quiz verwijderen
        </button>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-startsm:pt-5 ">
  
        <label for="quiz_video_time_{i}" class="block text-sm font-medium text-gray-700">
          Tijd in video
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div class="mt-1 flex rounded-md shadow-sm">
            <input type="number" step="0.1" name="quiz_video_time_{i}" id="quiz_video_time_{i}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={quiz.timeInVideo}>
          </div>
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
        <label for="quiz_type_{i}" class="block text-sm font-medium text-gray-700">
          Type
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <select id="quiz_type_{i}" name="quiz_type_{i}" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" bind:value={quiz.type}>
              <option value="multiple_choice">Multiple choice</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
        <label for="quiz_quistion_{i}" class="block text-sm font-medium text-gray-700">
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
        <label for="quiz_test_question_{i}" class="block text-sm font-medium text-gray-700">
          TestVraag
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <input type="number" name="quiz_test_question_{i}" id="quiz_test_question_{i}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={quiz.testQuestion}>
        </div>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
        <label class="block text-sm font-medium text-gray-700">
          Antwoorden
        </label>
        <div class="mt-3 sm:col-span-2">
        {#each quiz.answers as answer, i2}
          <div class="mt-3 sm:col-span-2">
              <textarea
              rows="3"
              bind:value={answer.answer}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
            <div class="mt-3">
              <input bind:checked={answer.correct} type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
              <label class="font-medium text-gray-700">Goed antwoord</label>
            </div> 
            <button type="button" on:click|preventDefault={() => deleteQuizAnswer(i, i2)} class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
              <input id="quiz_answer_correct" name="quiz_answer_correct" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" bind:checked={quiz.quizNewAnswerCorrect}>
              <label for="quiz_answer_correct" class="font-medium text-gray-700">Goed antwoord</label>
            </div>  
          </div>
            <button type="button" on:click|preventDefault={() => addAnswerInExistingQuiz(quiz)} class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Antwoord toevoegen
            </button>
          </div>
        </div>
      </div>
    {/each}


    <b>This form is for new quizzes!</b>

    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 sm:border-t sm:border-gray-200">
      <label for="quiz_video_time" class="block text-sm font-medium text-gray-700">
        Tijd in video
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 flex rounded-md shadow-sm">
          <input type="number" step="0.1" name="quiz_video_time" id="quiz_video_time" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={quizTimeInVideo}>
        </div>
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
      <label for="quiz_type" class="block text-sm font-medium text-gray-700">
        Type
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <select id="quiz_type" name="quiz_type" autocomplete="country" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" bind:value={quizType}>
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
      <label for="quiz_test_question" class="block text-sm font-medium text-gray-700">
        TestVraag
      </label>
      <div class="mt-1 flex rounded-md shadow-sm">
        <input type="number" name="quiz_test_question" id="quiz_test_question" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={testQuestion}>
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
      <label class="block text-sm font-medium text-gray-700">
        Antwoorden
      </label>
      <div class="mt-3 sm:col-span-2">
      {#each quizAnswers as answer, i}
        <div class="mt-3 sm:col-span-2">
          <textarea
          rows="3"
          bind:value={answer.answer}
          class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
        <div class="mt-3">
          <input bind:checked={answer.correct} type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          <label class="font-medium text-gray-700">Goed antwoord</label>
          <button type="button" on:click|preventDefault={() => deleteAnswer(i)} class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
            <input id="quiz_answer_correct" name="quiz_answer_correct" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" bind:checked={quizNewAnswerCorrect}>
            <label for="quiz_answer_correct" class="font-medium text-gray-700">Goed antwoord</label>
          </div>  
        </div>
          <button type="button" on:click|preventDefault={addAnswer} class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Antwoord toevoegen
          </button>
        </div>
      </div>
    </div>
    <div class="mt-3 sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:pt-5">
      <button type="button" on:click|preventDefault={addQuiz} class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Quiz toevoegen
      </button>
    </div>
  </div>
</div>