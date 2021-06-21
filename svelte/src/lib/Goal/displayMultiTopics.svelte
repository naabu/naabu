<script>
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

  function onKeyPress(e){
    if (e.charCode === 13) {
      e.preventDefault();
      addMultiTopicSubmit();
    }
  }
</script>

<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label
    for="uni_topic_name"
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    Onderwerpen
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    {#each goal.multitopics as multiTopic, i}
      <div class="mt-1 mb-1">
        {multiTopic}
        <button
          class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click|preventDefault={() => removeMultiTopic(i)}>Weghalen</button
        >
      </div>
    {/each}
    <div>
      <input
        on:keypress={onKeyPress}
        type="text"
        bind:value={newMultitopic}
        name="uni_topic_name"
        id="uni_topic_name"
        class="mt-2 mb-2 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
      />
      <button
        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        on:click|preventDefault={addMultiTopicSubmit}>AddMultiTopic</button
      >
    </div>
  </div>
</div>
