<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
  import * as InputS from "$lib/Internals/FormFields/Input.stories.svelte";
  import * as ButtonS from "$lib/Internals/Button/Button.stories.svelte";
  import * as RadioS from "$lib/Internals/FormFields/Radio.stories.svelte";
  import * as SelectS from "$lib/Internals/FormFields/Select.stories.svelte";
  import * as CheckboxS from "$lib/Internals/FormFields/Checkbox.stories.svelte";

  import FieldSet from "./FieldSet.svelte";
  import FormField from "./FormField.svelte";
  import AdditionalFormText from "./AdditionalFormText.svelte";
  import DisplayMultiTopics from "$lib/Goal/Components/displayMultiTopics.svelte";

  let textInput;
  let numberInput;
  let emailInput;
  let submitButton;
  let exampleRadio;
  let exampleSelect;
  let singleCheckbox;
  let multipleCheckbox;

  $: {
    textInput = InputS.text_name(InputS.text_name.args);
    numberInput = InputS.number(InputS.number.args);
    emailInput = InputS.email(InputS.email.args);
    let submitButtonArgs = ButtonS.primary_small.args;
    submitButtonArgs.content = "Submit";
    submitButton = ButtonS.primary_small(submitButtonArgs);
    exampleRadio = RadioS.radioWithDescriptionDefault(
      RadioS.radioWithDescriptionDefault.args
    );
    exampleSelect = SelectS.multiple_compare(SelectS.multiple_compare.args);
    singleCheckbox = CheckboxS.single(CheckboxS.single.args);
    multipleCheckbox = CheckboxS.multiple(CheckboxS.multiple.args);
  }

  let goal = {
    multitopics: [],
  };
</script>

<Meta title="Form/Stories" />

<Template id="form_example_1" let:args>
  <SimpleDivDecorator>
    <form>
      <FieldSet
        title="Information"
        description="Please fill in the following information"
      >
        <FormField
          title="Name"
          forId="text_name"
          labelPosition={args.labelPosition}
        >
          <svelte:component this={textInput.Component} {...textInput.props} />
        </FormField>
        <FormField
          title="Email"
          forId={"email"}
          labelPosition={args.labelPosition}
        >
          <svelte:component this={emailInput.Component} {...emailInput.props} />
          <svelte:fragment slot="after">
            <AdditionalFormText
              content="We will never share your email with anyone else."
            />
          </svelte:fragment>
        </FormField>
        <FormField
          title="Number input"
          forId="number"
          labelPosition={args.labelPosition}
        >
          <svelte:component
            this={numberInput.Component}
            {...numberInput.props}
          />
        </FormField>
      </FieldSet>

      <FieldSet title="Details" description="Please also provide the details">
        <FormField title="Pick your exam" labelPosition={args.labelPosition}>
          <svelte:component
            this={exampleRadio.Component}
            {...exampleRadio.props}
          />
        </FormField>

        <FormField
          title="What car brand do you like?"
          labelPosition={args.labelPosition}
        >
          <svelte:component
            this={exampleSelect.Component}
            {...exampleSelect.props}
          />
        </FormField>

        <FormField title="Check the boxes" labelPosition={args.labelPosition}>
          <svelte:component
            this={singleCheckbox.Component}
            {...singleCheckbox.props}
          />
          <svelte:component
            this={multipleCheckbox.Component}
            {...multipleCheckbox.props}
          />
        </FormField>

        <DisplayMultiTopics bind:goal labelPosition={args.labelPosition} />

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
  args={{
    labelPosition: "left",
  }}
/>

<Story
  template="form_example_1"
  id="form_example_2"
  name="Example of a form with labels on top"
  args={{
    labelPosition: "top",
  }}
/>
