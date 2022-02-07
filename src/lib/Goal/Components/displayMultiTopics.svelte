<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";

  export let goal;
  let newMultitopic = "";

  function addMultiTopicSubmit() {
    if (newMultitopic.length > 0) {
      goal.multitopics = [...goal.multitopics, newMultitopic];
    }
    newMultitopic = "";
  }

  function removeMultiTopic(event) {
    goal.multitopics.splice(event.detail.i, 1);
    goal.multitopics = goal.multitopics;
  }

  function onKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      addMultiTopicSubmit();
    }
  }
</script>

<FormField title="Onderwerpen" id="multi_topic_name">
  <svelte:fragment slot="before">
    <TextAndRemove items={goal.multitopics} on:remove={removeMultiTopic} />
  </svelte:fragment>
  <TextInput
    on:keypress={onKeyPress}
    bind:value={newMultitopic}
    id="multi_topic_name"
  />
  <svelte:fragment slot="after">
    <Button
      dataTest="add-multi-topic-button"
      size="small"
      on:click={addMultiTopicSubmit}
      content="Onderwerp toevoegen"
    />
  </svelte:fragment>
</FormField>
