<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import EmailInput from "$lib/Internals/FormFields/EmailInput.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
</script>

<Meta title="Input/Stories" />

<Template id="text" let:args>
  <SimpleDivDecorator>
    <TextInput {...args} />
  </SimpleDivDecorator>
</Template>

<Template id="email" let:args>
  <SimpleDivDecorator>
    <EmailInput {...args} />
  </SimpleDivDecorator>
</Template>

<Template id="number" let:args>
  <SimpleDivDecorator>
    <NumberInput {...args} />
  </SimpleDivDecorator>
</Template>

<Story
  template="text"
  id="text_name"
  name="Textinput not required, name autocomplete"
  args={{
    required: false,
    value: "text not required",
    dataTest: "inputTextForTest",
    autocomplete: "name",
  }}
/>

<Story
  template="email"
  id="email"
  name="Email required"
  args={{
    value: "email required",
    required: true,
    id:"email",
  }}
/>

<Story
  template="number"
  id="number"
  name="Number non required"
  args={{
    value: "15",
    min: 0,
    max: 100,
    step: 5,
    required: false,
  }}
/>
