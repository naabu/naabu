<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import SimpleDivDecorator from "$lib/Internals/Story/SimpleDivDecorator.svelte";
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
<Template let:args id="OneTab">
  <SimpleDivDecorator>
    <Tabs {...args} />
  </SimpleDivDecorator>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  id="mainfirst"
  name="MainTab1Selected"
  template="OneTab"
  args={{
    mainTabs: [
      {
        value: "tab1",
        url: "/?path=/story/tabs-stories--mainfirst",
        text: "Tab 1",
      },
      {
        value: "tab2",
        url: "",
        text: "Tab 2",
      },
    ],
    mainSelected: "tab1",
  }}
/>

<!-- 

<Story
  name="Main tab - Tab2 Selected"
  template="OneTab"
  args={{
    mainTabs: [
      {
        value: "tab1",
        url: "/?path=/story/tabs-stories--main-tab-tab-1-selected",
        text: "Tab 1",
      },
      {
        value: "tab2",
        url: "/?path=/story/tabs-stories--main-tab-tab-2-selected",
        text: "Tab 2",
      },
    ],
    mainSelected: "tab2",
  }}
/>

<Story
  name="Multiple tabs - MainTab1, Subtab1 Selected"
  template="OneTab"
  args={{
    mainTabs: [
      {
        value: "tab1",
        url:
          "/?path=/story/tabs-stories--multiple-tabs-main-tab-1-subtab-1-selected",
        text: "Tab 1",
      },
      {
        value: "tab2",
        url:
          "/?path=/story/tabs-stories--multiple-tabs-main-tab-1-subtab-1-selected",
        text: "Tab 2",
      },
    ],
    mainSelected: "tab1",
    subTabs: [
      {
        value: "subtab1",
        url:
          "/?path=/story/tabs-stories--multiple-tabs-main-tab-1-subtab-1-selected",
        text: "Sub Tab 1",
      },
      {
        value: "subtab2",
        url:
          "/?path=/story/tabs-stories--multiple-tabs-main-tab-1-subtab-2-selected",
        text: "Sub Tab 2",
      },
    ],
    subSelected: "subtab1",
  }}
/>
 -->
<Story
  id="sub2"
  name="Multiple tabs - MainTab1, Subtab2 Selected"
  template="OneTab"
  args={{
    mainTabs: [
      {
        value: "tab1",
        url:
          "",
        text: "Tab 1",
      },
      {
        value: "tab2",
        url:
          "",
        text: "Tab 2",
      },
    ],
    mainSelected: "tab1",
    subTabs: [
      {
        value: "subtab1",
        url:
          "",
        text: "Sub Tab 1",
      },
      {
        value: "subtab2",
        url:
          "",
        text: "Sub Tab 2",
      },
    ],
    subSelected: "subtab2",
  }}
/>


 <Story
  id="real"
  name="Tabs real content"
  template="OneTab"
  args={{
    mainTabs: [
      {
        value: "published",
        url: "",
        text: "Published (5)",
      },
      {
        value: "needs-approval",
        url: "",
        text: "Need approval (3)",
      },
      {
        value: "in-progress",
        url: "",
        text: "In progress (2)",
      },
      {
        value: "needs-work",
        url: "",
        text: "Werk nodig (10)",
      },
      {
        value: "trash-can",
        url: "",
        text: "Trash can (3)",
      },
    ],
    mainSelected: "published",
  }}
/>