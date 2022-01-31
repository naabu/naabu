<script>
import Button from "$lib/Internals/Button/Button.svelte";


  export let goal;
  let newMultitopic = "";

  function addMultiTopicSubmit() {
    if (newMultitopic.length > 0) {
      goal.multitopics = [...goal.multitopics, newMultitopic];
    }
    newMultitopic = "";
  }

  function removeMultiTopic(multiTopicToRemoveIndex) {
    goal.multitopics.splice(multiTopicToRemoveIndex, 1);
    goal.multitopics = goal.multitopics;
  }

  function onKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      addMultiTopicSubmit();
    }
  }
</script>

<div
  class="mt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label
    for="multi_topic_name"
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    Onderwerpen
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    {#each goal.multitopics as multiTopic, i}
      <div class="mt-1 mb-1">
        {multiTopic}
        <Button
          size="very-small"
          color="secondary"
          content="Weghalen"
          on:click={() => removeMultiTopic(i)}
        />
      </div>
    {/each}
    <div>
      <input
        on:keypress={onKeyPress}
        type="text"
        bind:value={newMultitopic}
        name="multi_topic_name"
        id="multi_topic_name"
        class="mt-2 mb-2 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
      />
      <Button 
        dataTest="add-multi-topic-button"
        size="small"
        on:click={addMultiTopicSubmit}
        content="Onderwerp toevoegen"
      />
    </div>
  </div>
</div>
