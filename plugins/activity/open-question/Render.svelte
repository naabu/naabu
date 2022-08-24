<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import DOMPurify from "dompurify";
  import { createEventDispatcher } from "svelte";
  import { renderKatexOutput } from "$lib/Internals/Misc/helper";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  export let data;

  let givenAnswer = "";
  let correct = false;
  let feedback = "";
  let numberOfTries = 0;
  let triesBeforeShowingSolution = 3;

  let buttonDisabled = false;
  export let canObserve = false;

  const dispatch = createEventDispatcher();

  export function observeParent() {
    dispatch("observeParent");
  }

  function checkCorrectAnswer(data) {
    buttonDisabled = true;
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
    numberOfTries = numberOfTries + 1;
    correct = false;
    for (let i = 0; i < data.correctAnswers.length; i++) {
      if (
        data.correctAnswers[i].trim().toLowerCase() ===
        givenAnswer.trim().toLowerCase()
      ) {
        correct = true;
        break;
      }
    }

    if (correct) {
      feedback =
        "<div data-test='correct-feedback' class='text-green-700 font-bold'>" +
        $t("correct") +
        "</div>";
    } else {
      feedback =
        "<div data-test='incorrect-feedback' class='text-red-400 font-bold'>" +
        $t("incorrect") +
        "</div>";
    }
    dispatch("exerciseAttempt", {
      isCorrect: correct,
      answerGiven: givenAnswer.trim().toLowerCase(),
    });
    return data;
  }

  function flagAnswerCorrect() {
    // In the future we could store this data and show it to the teacher.
    close();
  }

  function close() {
    givenAnswer = "";
    feedback = "";
    numberOfTries = 0;
    correct = false;
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

<div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
  <div
    class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
  >
    <div class="ml-4 mt-4">
      <h3
        data-test="quiz-question"
        class="text-lg leading-6 font-medium text-gray-900"
      >
        {@html renderKatexOutput(data.question)}
      </h3>
      <p class="mt-1 text-sm ">
        {#if feedback}
          {@html DOMPurify.sanitize(feedback)}
        {/if}
      </p>
    </div>
    <slot name="quiz-question-actions" />
  </div>
</div>

<div class="p-5 sm:p-6 w-full max-w-lg">
  <Textarea bind:value={givenAnswer} rows="3" />
  <div class="flex justify-end">
    {#if !correct}
      <Button
        isDisabled={correct || buttonDisabled}
        on:click={() => (data = checkCorrectAnswer(data))}
        content={numberOfTries == 0 ? $t("check") : $t("try-again")}
        color="primary"
      />
    {:else}
      <Button
        isDisabled={!correct}
        on:click={close}
        content={$t("continue")}
        color="primary"
      />
    {/if}
  </div>

  {#if numberOfTries >= triesBeforeShowingSolution}
    <b>List of correct answers</b>
    <div class="mt-4 bg-gray-100 shadow overflow-hidden sm:rounded-md max-w-lg">
      <ul class="divide-y divide-black-500">
        {#each data.correctAnswers as correctAnswer}
          <li class="py-4">
            <p
              class="text-sm font-medium text-gray-900 truncate ml-auto mr-auto w-fit"
            >
              {correctAnswer}
            </p>
          </li>
        {/each}
      </ul>
      <div class="flex pr-2 justify-end border-t-black-500 border-t">
        <Button on:click={flagAnswerCorrect}>
          {$t("my-answer-was-correct")}</Button
        >
      </div>
    </div>
  {/if}
</div>
