<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Checkbox from "$lib/Internals/FormFields/Checkbox.svelte";
  import MultipleCheckbox from "$lib/Internals/FormFields/MultipleCheckbox.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
</script>

<Meta title="Checkbox/Stories"/>

<Template id="single" let:args>
  <SimpleDivDecorator>
    <Checkbox {...args} />
  </SimpleDivDecorator>
</Template>

<Template id="multiple" let:args>
  <SimpleDivDecorator>
    <MultipleCheckbox {...args} />
  </SimpleDivDecorator>
</Template>

<Story
  template="single"
  id="single"
  name="Single checkbox"
  args={{
    checked: true,
    label: "Check me?"
  }}
/>

<Story
  template="multiple"
  id="multiple"
  name="Multiple checkbox"
  args={{
    group: ["option-2", "option-5"],
    options: [
      {
        value: "option-1",
        dataTest: "value-1",
        label: "Option 1",
      },
      {
        value: "option-2",
        dataTest: "value-2",
        label: "Longer option 2",
      },
      {
        value: "option-3",
        dataTest: "value-3",
        label: "O-3",
      },
      {
        value: "option-4",
        dataTest: "value-4",
        label: "Option 4",
      },
      {
        value: "option-5",
        dataTest: "value-5",
        label: "Option 5",
      }
    ]
  }}
/>
