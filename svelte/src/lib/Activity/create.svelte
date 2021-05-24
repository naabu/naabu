<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { session } from "$app/stores";
  import {onMount} from 'svelte';
  import algoliasearch from 'algoliasearch';
  import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js'
  import '@algolia/autocomplete-theme-classic';

  let title = "";
  let description = "";
  let videoVimeoId = null;
  let quizes = [];
  let quizTimeInVideo = null;
  let quizType = "multiple_choice";
  let quizQuestion = null;
  let quizNewAnswer = null;
  let quizNewAnswerCorrect = false;
  let quizAnswers = [];
  let testQuestion = null;


  let selectedLeerdoelen = [];
  let filters = "";
  let goalIndex = "acc_goals";

  $: console.log($session);

  $: console.log(quizes);

  if ($session.environment === 'development') {
    goalIndex = "dev_goals";
  }


  function addQuiz(){
    console.log(quizQuestion);
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
      console.log(quiz);
      quizes = [... quizes, quiz];
    
      quizTimeInVideo = null;
      quizType = "multiple_choice";
      quizQuestion = null;
      quizNewAnswer = null;
      quizNewAnswerCorrect = false;
      quizAnswers = [];
    }
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
    let objectIDsFilter = selectedLeerdoelen.map(leerdoel => "NOT objectID:" + leerdoel.objectID);
    filters = objectIDsFilter.join(' AND ');
  }

  function addLeerdoel(leerdoel) {
    selectedLeerdoelen = [... selectedLeerdoelen, leerdoel];
    resetFilters();
  }

  function removeLeerdoel(i) {
    selectedLeerdoelen.splice(i, 1);
    selectedLeerdoelen = selectedLeerdoelen;
    resetFilters();
  }

  onMount(() => {
    runAutocomplete();
  })

  function runAutocomplete() {
    const searchClient = algoliasearch(
      '6868GHOPYM',
      '91b10504939fb851e4fab041ddd92618'
    );
   
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

  async function createActivity() {
    const db = await getFirebaseFirestore($session.environment);
    let addLeerdoelen = [];
    for (let i = 0; i < selectedLeerdoelen.length; i++) {
      let toAdd = {};
      toAdd.objectID = selectedLeerdoelen[i].objectID;
      toAdd.taxonomy_solo = selectedLeerdoelen[i].taxonomy_solo;
      toAdd.taxonomy_bloom = selectedLeerdoelen[i].taxonomy_bloom;
      addLeerdoelen = [... addLeerdoelen, toAdd]
    }
    
    const data = {
      title: title,
      goals: addLeerdoelen,
      description: description,
      quizes: quizes,
    };

    if (videoVimeoId !== null) {
      data.video ={
        vimeoId: videoVimeoId
      }
    }
    
    
    console.log(data);
    
    try {
      await addDoc(collection(db, "activities"), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function formSubmit(event) {
    await createActivity();
  }

</script>

<div>

  <div>
    <nav class="sm:hidden" aria-label="Back">
      <a
        href="/beheer/activiteit"
        class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
      >
        <!-- Heroicon name: solid/chevron-left -->
        <svg
          class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Back
      </a>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <a
                href="/beheer"
                class="text-sm font-medium text-gray-400 hover:text-gray-200"
                >Beheer</a
              >
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="/beheer/activiteit"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Activiteit</a
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="#"
              aria-current="page"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Activiteit maken</a
            >
          </div>
        </li>
      </ol>
    </nav>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Activiteit maken</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Maak hier elke soort activiteit, bijvoorbeeld een uitleg video of quiz.
          </p>
        </div>
      </div>

    </div>
  </div>
  <form class="space-y-8 divide-y divide-gray-200" on:submit|preventDefault={formSubmit}>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div>
        <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
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
                bind:value={title}
                class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div
          class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
        >
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
              bind:value={description}
              class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
            <p class="mt-2 text-sm text-gray-500">
              Beschrijf kort de activiteit of de vraag
            </p>
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
              {#if selectedLeerdoelen.length === 0 }
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Nog geen leerdoelen aan activiteit toegevoegd
                </p>
              {:else}
                <ul>
                  {#each selectedLeerdoelen as leerdoel , i}
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
              <input type="number" name="vimeo_id" id="vimeo_id" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={videoVimeoId} >
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

        {#each quizes as quiz, i}
          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-startsm:pt-5 sm:border-t sm:border-gray-200">
            <label for="quiz_video_time_{i}" class="block text-sm font-medium text-gray-700">
              Tijd in video
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="number" name="quiz_video_time_{i}" id="quiz_video_time_{i}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={quiz.timeInVideo}>
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
        {/each}


        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 sm:border-t sm:border-gray-200">
          <label for="quiz_video_time" class="block text-sm font-medium text-gray-700">
            Tijd in video
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="mt-1 flex rounded-md shadow-sm">
              <input type="number" name="quiz_video_time" id="quiz_video_time" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" bind:value={quizTimeInVideo}>
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
          {#each quizAnswers as answer}
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

    <div class="mt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Activiteit aanmaken
          </button>
        </div>
      </div>
    </div>
  </form>

  
</div>
