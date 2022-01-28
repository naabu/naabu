<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "../Button/Button.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta title="Tabs/Test" component={Button} />

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args id="HelloWorldTemplate">
  {console.log(args)}
  <Button>{args.text}</Button>
</Template>

<Story
  id="HelloWorld"
  template="HelloWorldTemplate"
  name="HelloWorld"
  args={{
    text: "Hello world! story",
  }}
>
  <slot />
</Story>
