<script>
  import { getStores, session, page } from "$app/stores";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import { renderKatexOutput } from "$lib/Misc/helper.js";
  import Player from "@vimeo/player";
  import { onMount } from "svelte";
  import Notification from "$lib/Misc/notification.svelte";
  import DifficultyFeedback from "$lib/Feedback/difficulty.svelte";
  import BattleFight from "$lib/Battle/fight.svelte";
  import { hasSpecialClaims } from "$lib/User/helper.js";
  import { goto } from "$app/navigation";
  export let firebase;
  export let activity;
  export let showFeedback = true;

  let displayNotification = false;
  let lastQuizShown = null;
  let endVideoInSeconds = null;
  let activeQuiz = null;
  let lastActiveQuiz = null;
  let hideVideoIframe = false;
  let fightToggle = true;
  let toggleFeedback = false;
  let feedbackEnded = false;
  let hasBattles = false;

  $: if (activity.battles && activity.battles.length > 0) {
    hasBattles = true;
  }

  $: if (feedbackEnded && hasBattles) {
    fightToggle = true;
  }

  $: if (feedbackEnded && !hasBattles) {
    endActivity();
  }

  $: if (feedbackEnded && hasBattles && !fightToggle) {
    endActivity();
  }

  let notificationText = {
    title: "We ondersteunen niet fullscreen modus",
    description:
      "Omdat de video's interactief zijn werkt dit nog niet goed genoeg",
  };

  let activityHasEnded = false;
  let videoHasEnded = false;
  $: activityHasEnded = videoHasEnded;

  // Detect if there is a test question attached to the activity.
  // If not activity has ended when video has ended.
  // Ask the test question before showing the activity
  // Store which version (id) of the question was asked
  // If video has ended lets show a similar question again.
  // If possible a different question. If not the same question.

  // Refactor the quizzes storage?
  // Sub collection / new collection?
  // Activity Id => Goal Id => Quizz.

  let element;
  let player;
  let iframe;
  let y;

  let userHasSpecialClaims = hasSpecialClaims($session.user);

  async function endActivity() {
    // if (activity.type === "boss") {
    //   await unlockLocations();
    // }
    if (!userHasSpecialClaims) {
      await goto("/");
    } else {
      if ($page.path.includes("beheer")) {
        await goto("/beheer/activiteit");
      } else {
        await goto("/");
      }
    }
  }

  export let breadcrumbs = [];

  for (let i = 0; i < activity.quizzes.length; i++) {
    activity.quizzes[i].selectedAnswer = null;
    activity.quizzes[i].correct = false;
  }

  function scrollABitToTheTop(scroll = 200) {
    if (y - scroll > 0) {
      y = y - scroll;
    } else {
      y = 0;
    }
  }

  onMount(() => {
    if ((element = document.getElementById("vimeoVideo"))) {
      iframe = document.querySelector("#vimeoVideo iframe");
      if (iframe === null) {
        let vimeoOptions = {
          id: activity.video.vimeoId,
          controls: true,
          quality: "720p",
          playsinline: true,
        };
        player = new Player("vimeoVideo", vimeoOptions);
      }

      player.ready().then(function () {
        iframe = document.querySelector("#vimeoVideo iframe");
        iframe.setAttribute("data-cy", "vimeo-iframe");

        setInterval(checkTime, 50);

        player.on("play", function (data) {
          endVideoInSeconds = data.duration - 7;
        });

        player.on("fullscreenchange", function () {
          scrollABitToTheTop();
          displayNotification = true;
          if (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          }
        });
      });
    }
  });

  async function checkTime() {
    let seconds = await player.getCurrentTime();

    if (endVideoInSeconds !== null && seconds >= endVideoInSeconds) {
      videoHasEnded = true;
      if (!feedbackEnded) {
        toggleFeedback = true;
      }
    }

    for (let i = 0; i < activity.quizzes.length; i++) {
      let quiz = activity.quizzes[i];
      let difference = seconds - quiz.timeInVideo;
      if (
        activeQuiz === null &&
        difference > 0 &&
        difference < 1 &&
        (lastActiveQuiz === null || lastActiveQuiz !== quiz)
      ) {
        player.pause();
        activeQuiz = quiz;
        hideVideoIframe = true;
      }
      if (
        (difference > 1 || difference < -1) &&
        lastActiveQuiz !== null &&
        quiz === lastActiveQuiz
      ) {
        lastActiveQuiz = null;
      }
    }
  }

  function checkCorrectAnswer(quiz) {
    if (quiz.answers[quiz.selectedAnswer].correct === true) {
      quiz.feedback =
        "<div data-cy='correct-feedback' class='text-green-700 font-bold'>Correct</div>";
      quiz.correct = true;
    } else {
      quiz.feedback =
        "<div data-cy='incorrect-feedback' class='text-red-400 font-bold'>Incorrect</div>";
      quiz.false = true;
    }
    return quiz;
  }

  function closeActiveQuiz() {
    lastActiveQuiz = activeQuiz;
    activeQuiz.selectedAnswer = null;
    activeQuiz.feedback = "";
    activeQuiz.correct = false;
    hideVideoIframe = false;
    activeQuiz = null;
    player.play();
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

<svelte:window bind:scrollY={y} />

<Notification bind:displayNotification bind:notificationText time="4000" />

<div>
  <ShowBreadcrumb bind:breadcrumbs />
  {#if showFeedback}
    <DifficultyFeedback
      bind:toggle={toggleFeedback}
      bind:feedbackEnded
      bind:adventure={activity}
      bind:firebase
    />
  {/if}
  <BattleFight bind:toggle={fightToggle} bind:activity bind:firebase />

  {#if activity}
    <h1 class="text-lg leading-6 font-medium text-gray-900">
      {#if activity.title}
        {activity.title}
      {/if}
    </h1>
    {#if activity.description}
      {@html activity.description}
    {/if}

    <button
      class:displaynone={hideVideoIframe || activeQuiz === null}
      on:click={() => (hideVideoIframe = true)}
      class="relative ml-14 mt-11 float-left z-20 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      data-cy="back-to-quiz-button">Naar onderbreking</button
    >

    <div class:displaynone={hideVideoIframe} class="video mt-4">
      <div id="vimeoVideo" />
    </div>

    {#if activeQuiz !== null}
      <div class:displaynone={!hideVideoIframe} class="activeQuiz">
        <div class="bg-gray-100">
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="max-w-none mx-auto">
              <div
                class="quiz-container bg-white overflow-hidden sm:rounded-lg sm:shadow"
              >
                <div
                  class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6"
                >
                  <div
                    class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
                  >
                    <div class="ml-4 mt-4">
                      <button
                        type="button"
                        on:click={() => (hideVideoIframe = false)}
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        data-cy="watch-image-video-button"
                      >
                        Bekijk beeld video
                      </button>
                    </div>
                    <div class="mt-4 mr-10">Weet jij het antwoord?</div>
                    <div class="ml-4 mt-4 flex-shrink-0">
                      <div class="ml-4 flex-shrink-0 flex">
                        <button
                          on:click={closeActiveQuiz}
                          class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          data-cy="close-button"
                        >
                          <span class="sr-only">Close</span>
                          <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6"
                >
                  <div
                    class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
                  >
                    <div class="ml-4 mt-4">
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {@html renderKatexOutput(activeQuiz.question)}
                      </h3>
                      <p class="mt-1 text-sm ">
                        {#if activeQuiz.feedback}
                          {@html activeQuiz.feedback}
                        {/if}
                      </p>
                    </div>
                    <div class="ml-4 mt-4 flex-shrink-0">
                      <!-- If answer is correct then change this button to doorgaan -->
                      {#if !activeQuiz.correct}
                        <button
                          type="button"
                          disabled={activeQuiz.selectedAnswer === null}
                          on:click={() =>
                            (activeQuiz = checkCorrectAnswer(activeQuiz))}
                          class="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          data-cy="check-answer-button"
                        >
                          Nakijken
                        </button>
                      {:else}
                        <button
                          type="button"
                          on:click={closeActiveQuiz}
                          class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          data-cy="continue-button"
                        >
                          Doorgaan
                        </button>
                      {/if}
                    </div>
                  </div>
                </div>

                <div class="px-4 pb-5 sm:p-6 sm:pt-0">
                  {#each activeQuiz.answers as answer, i}
                    <label class="block mt-2 mb-2 pb-2 pt-2">
                      <input
                        type="radio"
                        bind:group={activeQuiz.selectedAnswer}
                        value={i}
                        data-cy="input-value-{i}"
                      />
                      {@html "<span class='pl-3'>" +
                        renderKatexOutput(answer.answer) +
                        "</span>"}
                    </label>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- {#each activity.quizzes as quiz}
    <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="max-w-none mx-auto">
        <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow">
          
          <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
              <div class="ml-4 mt-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {@html renderKatexOutput(quiz.question)}
                </h3>
                <p class="mt-1 text-sm ">
                  {#if quiz.feedback}
                    {@html quiz.feedback}
                  {/if}
                </p>
              </div>
              <div class="ml-4 mt-4 flex-shrink-0">
                <button type="button" disabled={quiz.selectedAnswer === null} on:click|preventDefault={() => quiz = checkCorrectAnswer(quiz)} class="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Nakijken
                </button>
              </div>
            </div>
          </div>

                <div class="px-4 pb-5 sm:p-6 sm:pt-0">
                  {#each quiz.answers as answer, i}
                  <label class="block mt-2 mb-2 pb-2 pt-2">
                    <input type=radio bind:group={quiz.selectedAnswer} value={i}>
                      {@html "<span class='pl-3'>" + renderKatexOutput(answer.answer) + "</span>"}
                  </label>
                  {/each}     
                </div>
              </div>
            </div>
      </div>
    </div>
    {/each} -->
  {:else}
    <!-- TODO: cleaner error message -->
    <p>Activiteit niet gevonden</p>
  {/if}
</div>

<style>
  .video {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    top: 0;
  }

  #vimeoVideo :global(iframe) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .displaynone {
    display: none;
  }

  .quiz-container {
    width: 100%;
    min-height: 52.25vw;
    position: relative;
  }
</style>
