<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
</script>

<Meta title="Form/Stories" component={TextAndRemove} />

<Template let:args>
  <SimpleDivDecorator>
    <TextAndRemove {...args} />
  </SimpleDivDecorator>
</Template>

<Story
  id="text_and_remove_topics"
  name="Text and remove topics"
  args={{
    items: ["Topic 1", "Topic 2", "Topic 3"],
    noItemsMessage: "No topics",
  }}
/>

<Story
  id="text_and_remove_no_topics"
  name="Text and remove - No topics"
  args={{
    items: [],
    noItemsMessage: "No topics",
  }}
/>
