<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "$lib/Internals/Button/Button.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Button/Stories"
  component={Button}
  argTypes={{
    isPrimary: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isSubmit: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["very-small", "small", "medium", "large", "very-large"],
    },
    content: { control: "text" },
    dataTest: { control: "text" },
    onClick: { action: "onClick" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Button {...args} on:click={args.onClick} />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name="Primary very small"
  args={({
    isPrimary: true,
    content: "Button",
    size: "very-small",
  }
)}
/>
<Story
  name="Primary small"
  args={{
    isPrimary: true,
    content: "Button",
    size: "small",
  }}
/>
<Story
  name="Primary medium"
  args={{
    isPrimary: true,
    content: "Button",
    size: "medium",
  }}
/>
<Story
  name="Primary large"
  args={{
    isPrimary: true,
    content: "Button",
    size: "large",
  }}
/>
<Story
  name="Primary very large"
  args={{
    isPrimary: true,
    content: "Button",
    size: "very-large",
  }}
/>

<Story
  name="Secondary very small"
  args={({
    isPrimary: false,
    content: "Button",
    size: "very-small",
  }
)}
/>
<Story
  name="Secondary small"
  args={{
    isPrimary: false,
    content: "Button",
    size: "small",
  }}
/>
<Story
  name="Secondary medium"
  args={{
    isPrimary: false,
    content: "Button",
    size: "medium",
  }}
/>
<Story
  name="Secondary large"
  args={{
    isPrimary: false,
    content: "Button",
    size: "large",
  }}
/>
<Story
  name="Secondary very large"
  args={{
    isPrimary: false,
    content: "Button",
    size: "very-large",
  }}
/>