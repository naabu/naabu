<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
  import * as InputS from "$lib/Internals/FormFields/Input.stories.svelte";
  let textInput;

  $: {
    textInput = InputS.text_name(InputS.text_name.args);
  }
</script>

<Meta title="Form/Stories" />

<Template id="fieldset" let:args>
  <SimpleDivDecorator>
    <FieldSet {...args} />
  </SimpleDivDecorator>
</Template>

<Template id="formfield" let:args>
  <SimpleDivDecorator>
    <FormField {...args}>
      <svelte:component this={textInput.Component} {...textInput.props} />
    </FormField>
  </SimpleDivDecorator>
</Template>

<!-- <svelte:component this={numberInput.Component} {...numberInput.props} /> -->

<Story
  template="fieldset"
  id="fieldset"
  name="FieldSet"
  args={{
    title: "Title of fieldset",
    description: "Description of fieldset",
  }}
/>

<Story
  template="fieldset"
  id="fieldset_example1"
  name="FieldSet"
  args={{
    title: "Information",
    description: "Give some general information about the topic",
  }}
/>

<Story
  template="formfield"
  id="formfield_label_left"
  name="FormField left"
  args={{
    title: "Title of formfield",
    labelPosition: "left",
  }}
/>

<Story
  template="formfield"
  id="formfield_label_left_empty"
  name="FormField left empty"
  args={{
    labelPosition: "left",
  }}
/>

<Story
  template="formfield"
  id="formfield_label_top"
  name="FormField label top"
  args={{
    title: "Title of formfield",
    labelPosition: "top",
  }}
/>
