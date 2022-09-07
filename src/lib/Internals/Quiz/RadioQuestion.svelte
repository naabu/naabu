<script>
  import { renderKatexOutput } from "../Misc/helper";
  import { t } from "svelte-intl-precompile";
 import DOMPurify from 'dompurify';
  export let quiz;
</script>

<div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
  <div
    class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
  >
    <div class="ml-4 mt-4">
      <h3
        data-test="quiz-question"
        class="text-lg leading-6 font-medium text-gray-900"
      >
        {@html renderKatexOutput(quiz.question)}
      </h3>
      <p class="mt-1 text-sm ">
        {#if quiz.feedback}
          {@html quiz.feedback}
        {/if}
      </p>
    </div>
    <slot name="quiz-question-actions" />
  </div>
</div>

<div class="px-4 pb-5 sm:p-6 sm:pt-0">
  {#each quiz.answers as answer, i}
    <label class="block mt-2 mb-2 pb-2 pt-2">
      <input
        type="radio"
        class="focus:ring-blue-600 h-4 w-4 text-blue-600 border-gray-300"
        bind:group={quiz.selectedAnswer}
        value={i}
        data-test="input-value-{i}"
      />
      {@html DOMPurify.sanitize("<span class='pl-3'>" +
        renderKatexOutput(answer.answer) +
        "</span>")}
    </label>
  {/each}
</div>
