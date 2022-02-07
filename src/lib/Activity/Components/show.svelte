<script>
  import { getStores, session, page } from "$app/stores";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper.js";
  import Player from "@vimeo/player";
  import { onMount } from "svelte";
  import Notification from "$lib/Internals/Misc/notification.svelte";
  import DifficultyFeedback from "$lib/Activity/Components/feedbackDifficulty.svelte";
  import BattleFight from "$lib/Goal/Components/battleFight.svelte";
  import { hasSpecialClaims } from "$lib/Internals/User/helper.js";
  import { goto } from "$app/navigation";
  import Button from "$lib/Internals/Button/Button.svelte";
  import RadioQuestion from "$lib/Internals/Quiz/RadioQuestion.svelte";
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

  $: if (activity && activity.battles && activity.battles.length > 0) {
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
  let mounted = false;
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
      setTimeout(async () => {
        await goto(
          "/module/" +
            $page.params.moduleId +
            "/locatie/" +
            $page.params.locationId
        );
      }, 2000);
    } else {
      if ($page.path.includes("beheer")) {
        await goto("/beheer/activiteit");
      } else {
        setTimeout(async () => {
          await goto(
            "/module/" +
              $page.params.moduleId +
              "/locatie/" +
              $page.params.locationId
          );
        }, 2000);
      }
    }
  }

  export let breadcrumbs = [];

  $: if (activity) {
    for (let i = 0; i < activity.quizzes.length; i++) {
      activity.quizzes[i].selectedAnswer = null;
      activity.quizzes[i].correct = false;
    }
  }

  function scrollABitToTheTop(scroll = 200) {
    if (y - scroll > 0) {
      y = y - scroll;
    } else {
      y = 0;
    }
  }

  $: if (mounted && activity.video.vimeoId) {
    initializeVideoPlayer();
  }

  onMount(async () => {
    mounted = true;
  });

  function initializeVideoPlayer() {
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
        iframe.setAttribute("data-test", "vimeo-iframe");

        setInterval(checkTime, 10);

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
  }

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
        "<div data-test='correct-feedback' class='text-green-700 font-bold'>Correct</div>";
      quiz.correct = true;
    } else {
      quiz.feedback =
        "<div data-test='incorrect-feedback' class='text-red-400 font-bold'>Incorrect</div>";
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
      bind:activity
      bind:firebase
    />
  {/if}
  {#if activity && activity.battles}
    <BattleFight bind:toggle={fightToggle} bind:activity bind:firebase />
  {/if}
  {#if activity}
    <h1 class="text-lg leading-6 font-medium text-gray-900">
      {#if activity.title}
        {activity.title}
      {/if}
    </h1>
    {#if activity.description}
      {@html activity.description}
    {/if}

    <div
      class:displaynone={hideVideoIframe || activeQuiz === null}
      class="relative ml-14 mt-16 float-left z-20"
    >
      <Button
        on:click={() => (hideVideoIframe = true)}
        color="primary"
        dataTest="back-to-quiz-button"
        content="Naar quiz"
      />
    </div>

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
                      <Button
                        on:click={() => (hideVideoIframe = false)}
                        dataTest="watch-image-video-button"
                        content="Bekijk beeld video"
                        color="primary"
                      />
                    </div>
                    <div class="mt-4 mr-10">Weet jij het antwoord?</div>
                    <div class="ml-4 mt-4 flex-shrink-0">
                      <div class="ml-4 flex-shrink-0 flex">
                        <Button
                          on:click={closeActiveQuiz}
                          dataTest="close-button"
                          color="whitePrimaryIcon"
                          size="icon-square"
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
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <RadioQuestion bind:quiz={activeQuiz}>
                  <div
                    slot="quiz-question-actions"
                    class="ml-4 mt-4 flex-shrink-0"
                  >
                    {#if !activeQuiz.correct}
                      <Button
                        isDisabled={activeQuiz.selectedAnswer === null}
                        on:click={() =>
                          (activeQuiz = checkCorrectAnswer(activeQuiz))}
                        dataTest="check-answer-button"
                        content="Nakijken"
                        color="primary"
                      />
                    {:else}
                      <Button
                        isDisabled={activeQuiz.selectedAnswer === null}
                        on:click={closeActiveQuiz}
                        dataTest="continue-button"
                        content="Doorgaan"
                        color="primary"
                      />
                    {/if}
                  </div>
                </RadioQuestion>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {:else}
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
