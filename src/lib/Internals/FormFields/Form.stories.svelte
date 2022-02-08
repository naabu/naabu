<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
  import * as InputStories from "$lib/Internals/FormFields/Input.stories.svelte";
  import * as ButtonStories from "$lib/Internals/Button/Button.stories.svelte";
  import * as RadioStories from "$lib/Internals/FormFields/Radio.stories.svelte";
  import * as SelectStories from "$lib/Internals/FormFields/Select.stories.svelte";

  import FieldSet from "./FieldSet.svelte";
  import FormField from "./FormField.svelte";
  import AdditionalFormText from "./AdditionalFormText.svelte";

  let textInput;
  let numberInput;
  let emailInput;
  let submitButton;
  let exampleRadio;
  let exampleSelect;

  $: {
    textInput = InputStories.text_name(InputStories.text_name.args);
    numberInput = InputStories.number(InputStories.number.args);
    emailInput = InputStories.email(InputStories.email.args);
    let submitButtonArgs = ButtonStories.primary_small.args;
    submitButtonArgs.content = "Submit";
    submitButton = ButtonStories.primary_small(submitButtonArgs);
    exampleRadio = RadioStories.radioWithDescriptionDefault(
      RadioStories.radioWithDescriptionDefault.args
    );
    exampleSelect = SelectStories.multiple_compare(
      SelectStories.multiple_compare.args
    );
  }
</script>

<Meta title="Form/Stories" />

<Template id="form_example_1" let:args>
  <SimpleDivDecorator>
    <form>
      <FieldSet
        title="Information"
        description="Please fill in the following information"
      >
        <FormField title="Name" labelPosition="left">
          <svelte:component this={textInput.Component} {...textInput.props} />
        </FormField>
        <FormField title="Email" forId={"email"} labelPosition="left">
          <svelte:component this={emailInput.Component} {...emailInput.props} />
          <svelte:fragment slot="after">
            <AdditionalFormText
              content="We will never share your email with anyone else."
            />
          </svelte:fragment>
        </FormField>

        <FormField title="Pick your exam" labelPosition="left">
          <svelte:component
            this={exampleRadio.Component}
            {...exampleRadio.props}
          />
        </FormField>

        <FormField title="What car brand do you like?" labelPosition="left">
          <svelte:component
            this={exampleSelect.Component}
            {...exampleSelect.props}
          />
        </FormField>
        <svelte:component
          this={submitButton.Component}
          {...submitButton.props}
        />
      </FieldSet>
    </form>
  </SimpleDivDecorator>
</Template>

<!-- <svelte:component this={numberInput.Component} {...numberInput.props} /> -->

<Story
  template="form_example_1"
  id="form_example_1"
  name="Example of a form"
  args={{}}
/>
