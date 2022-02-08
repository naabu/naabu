<script>
  export let id = "formfield-id";
  export let forId = id;
  export let title;
  export let component;
  export let labelPosition = "left";
  let labelTopClasses = ["mt-3"];
  let labelLeftClasses = [
    "sm:grid",
    "sm:grid-cols-3",
    "sm:gap-4",
    "sm:items-start",
    "sm:border-t",
    "sm:border-gray-200",
    "sm:pt-5",
  ];
  let classes = [];

  $: {
    classes = [];

    switch (labelPosition) {
      case "left":
      default:
        classes = labelLeftClasses.join(" ");
        break;
      case "top":
        classes = labelTopClasses.join(" ");
        break;
      case "none":
        classes = "";
        break;
    }
  }
</script>

<div class={classes}>
  {#if labelPosition && labelPosition !== "none"}
    <label
      for={forId}
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      {#if title}
        {title}
      {/if}
    </label>
  {/if}

  <div class="mt-1 mb-1 sm:mt-0 sm:col-span-2">
    <slot name="before" />
    <slot>
      {#if component}
        <svelte:component this={component} />
      {/if}
    </slot>
    <slot name="after" />
  </div>
</div>
