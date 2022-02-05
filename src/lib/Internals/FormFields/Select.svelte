<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let compareFunction;

  $: if (compareFunction && value) {
    for(let i  = 0; i < options.length; i++) {
      options[i].selected = false;
      if (compareFunction(options[i].value, value)) {
        options[i].selected = true;
      }
    }
  }

  export let id = "select-id";
  export let title;
  export let value;
  export let options = [];
  export let labelOnTop = false;
  export let multiple = false;
  let labelTopClasses = ["mt-3"];
  let labelLeftClasses = [
    "sm:grid",
    "sm:grid-cols-3",
    "sm:gap-4",
    "sm:items-start",
    "sm:border-t",
    "sm:border-gray-200",
    "sm:pt-5",
  ];
  let classes = labelLeftClasses.join(" ");
  $: if (labelOnTop) {
    classes = labelTopClasses.join(" ");
  }
</script>

<div class={classes}>
  <label for={id} class="block mb-1 text-sm font-medium text-gray-700">
    {title}
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      {#if multiple}
        <select
          on:change={() => dispatch("change")}
          multiple
          bind:value
          {id}
          name={id}
          class="resize-y max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        >
          {#each options as option}
            <option value={option.value}>{option.content}</option>
          {/each}
        </select>
      {:else}
        <select
          bind:value  
          on:change={() => dispatch("change")}
          {id}
          name={id}
          class=" block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        >
          {#each options as option}
            <option
              value={option.value}
              class:selected={option.selected}>{option.content}</option
            >
          {/each}
        </select>
      {/if}
    </div>
  </div>
</div>
<!-- 
<div class="mt-3">
  <label for="quiz_type" class="mb-1  block text-sm font-medium text-gray-700">
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
</div> -->
