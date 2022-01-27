<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import MarginDecorator from "$lib/Internals/Story/MarginDecorator.svelte";
</script>

<!--   export let mainTabs;
  export let subTabs;
  export let mainSelected;
  export let subSelected;
 -->

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta title="Tabs/Stories" component={Tabs} />

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <MarginDecorator>
    <Tabs {...args} />
  </MarginDecorator>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name="Main tab - Tab1 Selected"
  args={{
    mainTabs: [{value: "tab1", url: "/?path=/story/tabs-stories--main-tab-tab-1-selected", text: "Tab 1"}, {value: "tab2", url: "/?path=/story/tabs-stories--main-tab-tab-2-selected", text: "Tab 2"}],
    mainSelected: "tab1",
  }}
/>

<Story
  name="Main tab - Tab2 Selected"
  args={{
    mainTabs: [{value: "tab1", url: "/?path=/story/tabs-stories--main-tab-tab-1-selected", text: "Tab 1"}, {value: "tab2", url: "/?path=/story/tabs-stories--main-tab-tab-2-selected", text: "Tab 2"}],
    mainSelected: "tab2",
  }}
/>
