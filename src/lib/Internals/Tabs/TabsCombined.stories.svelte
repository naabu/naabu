<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import * as TabStories from "$lib/Internals/Tabs/Tabs.stories.svelte";
  // { mainfirst, real }
  let topTapOutput;
  let realOutput;

  $: {
    topTapOutput = TabStories.sub2(TabStories.sub2.args);
    realOutput = TabStories.real(TabStories.real.args);
  }
</script>

<Meta title="Tabs/Stories" />

<Template id="MultipleTabs" let:args>
  <svelte:component
    this={topTapOutput.Component}
    {...topTapOutput.props}
  />
  <svelte:component this={realOutput.Component} {...realOutput.props} />
</Template>

<Story
  id="combined"
  template="MultipleTabs"
  name="Combined"
  args={{ hello: "world" }}
/>
