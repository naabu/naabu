<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import RadioQuestion  from "$lib/Internals/Quiz/RadioQuestion.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
</script>

<Meta title="Radio/Stories" component={RadioQuestion} />

<Template let:args>
  <SimpleDivDecorator>
    <RadioQuestion {...args} />
  </SimpleDivDecorator>
</Template>

<Story
  id="radioQuiz"
  name="Quiz with radio inputs"
  args={{
    quiz: {
      question: "What is your favorite color?",
      answers: [
        {
          answer: "Red",
        },
        {
          answer: "Blue",
        },
        {
          answer: "Green",
        }
      ]
    }
  }}
/>
