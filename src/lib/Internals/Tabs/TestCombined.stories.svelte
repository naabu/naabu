<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "../Button/Button.svelte";
  // HelloWorls is a function.
  import * as TestStories from './Test.stories.svelte';
  import { HelloWorld } from "./Test.stories.svelte";
  let HelloWorldOutput;

  $: {
    // The output of the function contains a Component and props.
    HelloWorldOutput = HelloWorld(TestStories.HelloWorld.args);
    console.log(HelloWorldOutput);
  }
</script>

<Meta title="Tabs/Test" component={HelloWorld} subcomponents={Button} />


<Template let:args>
  <!-- We can render the output of the function with the svelte:component tag -->
  {console.log(args)}
  <svelte:component
    this={HelloWorldOutput.Component}
    {...HelloWorldOutput.props}
  
  />
  <svelte:component
    this={HelloWorldOutput.Component}
    {...HelloWorldOutput.props}
  />
  <svelte:component
    this={HelloWorldOutput.Component}
    {...HelloWorldOutput.props}
  />
  <svelte:component
    this={HelloWorldOutput.Component}
    {...HelloWorldOutput.props}
  />
</Template>

<Story
  id="combinedstory"
  name="HelloWorldCombinedStory"
  args={{
    text: "Test",
  }}
/>
