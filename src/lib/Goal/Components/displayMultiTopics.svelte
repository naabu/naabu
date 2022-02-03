<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";

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

<TextInput
  title="Onderwerpen"
  on:keypress={onKeyPress}
  bind:value={newMultitopic}
  id="multi_topic_name"
>
  <svelte:fragment slot="above-input">
    <div
      class="sm:grid sm:grid-cols-2 space-between justify-items-start items-center"
    >
      {#each goal.multitopics as multiTopic, i}
        {multiTopic}
        <Button
          size="very-small"
          color="secondary"
          content="Weghalen"
          on:click={() => removeMultiTopic(i)}
        />
      {/each}
    </div>
  </svelte:fragment>
  <svelte:fragment slot="below-input">
    <Button
      dataTest="add-multi-topic-button"
      size="small"
      on:click={addMultiTopicSubmit}
      content="Onderwerp toevoegen"
    />
  </svelte:fragment>
</TextInput>
