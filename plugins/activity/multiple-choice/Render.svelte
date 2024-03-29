<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import RadioQuestion from "$lib/Internals/Quiz/RadioQuestion.svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  export let data;
  export let canObserve = false;

  if (!data.selectedAnswer) {
    data.selectedAnswer = null;
  }

  const dispatch = createEventDispatcher();

  export function observeParent() {
    dispatch("observeParent");
  }

  function checkCorrectAnswer(quiz) {
    if (quiz.answers[quiz.selectedAnswer].correct === true) {
      // User specified the correct answer.
      // Store this result to use in the models for the dashboard.
      // Indicator of performance
      // Correct means the student is providing evidence
      // That it has learned the learning goal.=
      quiz.feedback =
        "<div data-test='correct-feedback' class='text-green-700 font-bold'>" +
        $t("correct") +
        "</div>";
      quiz.correct = true;
    } else {
      quiz.feedback =
        "<div data-test='incorrect-feedback' class='text-red-400 font-bold'>" +
        $t("incorrect") +
        "</div>";
      quiz.false = true;
    }

    dispatch("exerciseAttempt", {
      isCorrect: quiz.answers[quiz.selectedAnswer].correct,
      answerGiven: quiz.answers[quiz.selectedAnswer].answer,
    });
    return quiz;
  }

  function close() {
    data.selectedAnswer = null;
    data.feedback = "";
    data.correct = false;
    dispatch("end");
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

<div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
  <div
    class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
  >
    <div class="ml-4 mt-4">
      {#if canObserve}
        <Button
          on:click={observeParent}
          dataTest="watch-image-video-button"
          content={$t("show-image-video")}
          color="primary"
        />
      {/if}
    </div>
    <div class="mt-4 mr-10">{$t("do-you-know-the-answer")}</div>
    <div class="ml-4 mt-4 flex-shrink-0">
      <div class="ml-4 flex-shrink-0 flex">
        <Button
          on:click={close}
          dataTest="close-button"
          color="whitePrimaryIcon"
          size="icon-square"
        >
          <span class="sr-only">{$t("close")}</span>
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

<RadioQuestion bind:quiz={data}>
  <div slot="quiz-question-actions" class="ml-4 mt-4 flex-shrink-0">
    {#if !data.correct}
      <Button
        isDisabled={data.selectedAnswer === null}
        on:click={() => (data = checkCorrectAnswer(data))}
        dataTest="check-answer-button"
        content={$t("check")}
        color="primary"
      />
    {:else}
      <Button
        isDisabled={data.selectedAnswer === null}
        on:click={close}
        dataTest="continue-button"
        content={$t("continue")}
        color="primary"
      />
    {/if}
  </div>
</RadioQuestion>
