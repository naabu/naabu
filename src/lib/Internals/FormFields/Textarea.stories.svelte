<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
</script>

<Meta title="Textarea/Stories" component={Textarea} />

<Template let:args>
  <SimpleDivDecorator>
    <Textarea {...args} />
  </SimpleDivDecorator>
</Template>
<Story
  id="one_row"
  name="Textarea with one row"
  args={{
    value: "One row to go.",
  }}
/>

<Story
  id="three_rows"
  name="Textarea with three rows"
  args={{
    value: "Three rows.",
    rows: "3",
  }}
/>

<Story
id="five_rows"
  name="Textarea with five rows"
  args={{
    value: "Five rows.",
    rows: "5",
  }}
/>

