<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "$lib/Internals/Button/Button.svelte";
  import MarginDecorator from "$lib/Internals/Story/MarginDecorator.svelte";
  import GreyBackgroundDecorator from "$lib/Internals/Story/GreyBackgroundDecorator.svelte";
  import PositionOnBottom from "../Story/PositionOnBottom.svelte";
 import DOMPurify from 'dompurify';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Button/Stories"
  component={Button}
  argTypes={{
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "warning",
        "whitePrimaryIcon",
        "whiteFullIcon",
        "whiteFullIconNoFocus",
        "blueWhiteIcon",
        "lightRed",
      ],
    },
    isDisabled: { control: "boolean" },
    isSubmit: { control: "boolean" },
    isLinkToGoogle: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: [
        "tiny",
        "very-small",
        "small",
        "medium",
        "large",
        "very-large",
        "icon-square",
        "icon-square-small",
        "icon-round",
      ],
    },
    content: { control: "text" },
    svelteSlot: { control: "text" },
    dataTest: { control: "text" },
    onClick: { action: "onClick" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <MarginDecorator>
    <Button {...args} on:click={args.onClick}>
      {#if args.svelteSlot}
        {@html DOMPurify.sanitize(args.svelteSlot)}
      {:else}
        {args.content}
      {/if}
    </Button>
  </MarginDecorator>
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
  id="primary_small"
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
  name="Light red tiny"
  args={{
    color: "lightRed",
    size: "tiny",
    content: "Delete",
  }}
/>


<Story
  name="Warning medium"
  args={{
    color: "warning",
    content: "Verwijderen",
  }}
/>


<Story
  name="whitePrimaryIcon Square "
  args={{
    color: "whitePrimaryIcon",
    size: "icon-square",
    svelteSlot:
      '<span class="sr-only">Open sidebar</span>\r\n        <svg\r\n          class="h-6 w-6"\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          fill="none"\r\n          viewBox="0 0 24 24"\r\n          stroke="currentColor"\r\n          aria-hidden="true"\r\n        >\r\n          <path\r\n            stroke-linecap="round"\r\n            stroke-linejoin="round"\r\n            stroke-width="2"\r\n            d="M4 6h16M4 12h16M4 18h16"\r\n          />\r\n        </svg>',
  }}
/>

<Story
  name="whitePrimaryIcon Square No Focus"
  args={{
    color: "whitePrimaryIconNoFocus",
    size: "icon-square",
    svelteSlot:
      '<span class="sr-only">Open sidebar</span>\r\n        <svg\r\n          class="h-6 w-6"\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          fill="none"\r\n          viewBox="0 0 24 24"\r\n          stroke="currentColor"\r\n          aria-hidden="true"\r\n        >\r\n          <path\r\n            stroke-linecap="round"\r\n            stroke-linejoin="round"\r\n            stroke-width="2"\r\n            d="M4 6h16M4 12h16M4 18h16"\r\n          />\r\n        </svg>',
  }}
/>


<Story
  name="whiteFullIcon Round"
  args={{
    color: "whiteFullIcon",
    size: "icon-round",
    svelteSlot:
      '<span class="sr-only">Close sidebar</span>\r\n                <svg\r\n                  class="h-6 w-6 text-white"\r\n                  xmlns="http://www.w3.org/2000/svg"\r\n                  fill="none"\r\n                  viewBox="0 0 24 24"\r\n                  stroke="currentColor"\r\n                  aria-hidden="true"\r\n                >\r\n                  <path\r\n                    stroke-linecap="round"\r\n                    stroke-linejoin="round"\r\n                    stroke-width="2"\r\n                    d="M6 18L18 6M6 6l12 12"\r\n                  />\r\n                </svg>',
  }}
  decorators={[() => GreyBackgroundDecorator]}
/>


<Story
  name="Green alert button"
  args={{
    color: "greenAlert",
    size: "very-small",
    content: "Sluiten",
  }}
/>

<Story
  name="linkToGoogle"
  args={{
    isLinkToGoogle: true,
    content: "Button",
  }}
/>
