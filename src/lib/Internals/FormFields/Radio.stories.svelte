<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
</script>

<Meta title="Radio/Stories" component={Radio} />

<Template let:args>
  <SimpleDivDecorator>
    <Radio {...args} />
  </SimpleDivDecorator>
</Template>

<Story
  id="radioNoDescriptionNoDefault"
  name="Radio with no description and no default"
  args={{
    options: [
      {
        label: "Map",
        value: "map",
      },
      {
        label: "Module",
        value: "module",
      },
      {
        label: "Learning goal",
        value: "goal",
      },

      {
        label: "Activity",
        value: "activity",
      },
    ],
  }}
/>

<Story
  id="radioWithDescriptionDefault"
  name="Radio with description and default"
  args={{
    selectedValue: "summative",
    options: [
      {
        label: "Formative assesments",
        description: "Informal feedback while you are learning",
        value: "formative",
      },
      {
        label: "Summative assesments",
        description:
          "Formal feedback to compare where you stand against others",
        value: "summative",
      },
      {
        label: "No assesments",
        description: "For people that prefer not to be assessed",
        value: "none",
      },
    ],
  }}
/>

<Story
  id="radioWithNoTitle"
  name="Radio with no title"
  args={{
    options: [
      {
        label: "I like pinaapple on my pizza",
        value: "correct",
      },
      {
        label: "I hate people that put pineapple on their pizza",
        value: "incorrect",
      },
    ],
  }}
/>
