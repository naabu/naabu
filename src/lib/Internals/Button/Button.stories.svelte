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
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "warning", "whiteIcon"],
    },
    isDisabled: { control: "boolean" },
    isSubmit: { control: "boolean" },
    isLinkToGoogle: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["very-small", "small", "medium", "large", "very-large"],
    },
    content: { control: "text" },
    svelteSlot: { control: "text" },
    dataTest: { control: "text" },
    onClick: { action: "onClick" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Button {...args} on:click={args.onClick}>
    {#if args.svelteSlot}
      {@html args.svelteSlot}
    {:else}
      {args.content}
    {/if}
  </Button>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name="Primary very small"
  args={{
    color: "primary",
    content: "Button",
    size: "very-small",
  }}
/>
<Story
  name="Primary small"
  args={{
    color: "primary",
    content: "Button",
    size: "small",
  }}
/>
<Story
  name="Primary medium"
  args={{
    color: "primary",
    content: "Button",
  }}
/>
<Story
  name="Primary large"
  args={{
    color: "primary",
    content: "Button",
    size: "large",
  }}
/>
<Story
  name="Primary very large"
  args={{
    color: "primary",
    content: "Button",
    size: "very-large",
  }}
/>

<Story
  name="Secondary very small"
  args={{
    content: "Button",
    size: "very-small",
  }}
/>
<Story
  name="Secondary small"
  args={{
    content: "Button",
    size: "small",
  }}
/>
<Story
  name="Secondary medium"
  args={{
    content: "Button",
  }}
/>
<Story
  name="Secondary large"
  args={{
    content: "Button",
    size: "large",
  }}
/>
<Story
  name="Secondary very large"
  args={{
    content: "Button",
    size: "very-large",
  }}
/>

<Story
  name="Warning medium"
  args={{
    color: "warning",
    content: "Button",
  }}
/>

<Story
  name="whiteCloseIcon"
  args={{
    color: "whiteIcon",
    size: "icon-square",
    svelteSlot: "<span class=\"sr-only\">Close<\/span>\r\n                          <svg\r\n                            class=\"h-5 w-5\"\r\n                            xmlns=\"http:\/\/www.w3.org\/2000\/svg\"\r\n                            viewBox=\"0 0 20 20\"\r\n                            fill=\"currentColor\"\r\n                            aria-hidden=\"true\"\r\n                          >\r\n                            <path\r\n                              fill-rule=\"evenodd\"\r\n                              d=\"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z\"\r\n                              clip-rule=\"evenodd\"\r\n                            \/>\r\n                          <\/svg>"
  }}
/>


<Story
  name="linkToGoogle"
  args={{
    isLinkToGoogle: true,
    content: "Button",
  }}
/>
