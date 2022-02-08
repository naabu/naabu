<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let compareFunction;

  $: if (compareFunction && value) {
    for (let i = 0; i < options.length; i++) {
      options[i].selected = false;
      if (compareFunction(options[i].value, value)) {
        options[i].selected = true;
      }
    }
  }

  export let id = "select-id";
  export let value;
  export let options = [];
  export let multiple = false;

  let classes = [
    "block",
    "focus:ring-indigo-500",
    "focus:border-indigo-500",
    "w-full",
    "shadow-sm",
    "sm:max-w-xs",
    "sm:text-sm",
    "border-gray-300",
    "rounded-md",
  ];

  if (multiple) {
    classes = [...classes, ["resize-y", "max-w-lg"]];
  }
</script>

{#if multiple}
  <select
    on:change={() => dispatch("change")}
    multiple
    bind:value
    {id}
    name={id}
    class={classes.join(" ")}
  >
    {#each options as option}
      <option value={option.value}>{option.content}</option>
    {/each}
  </select>
{:else}
  <select
    bind:value
    on:change={() => dispatch("change")}
    {id}
    name={id}
    class={classes.join(" ")}
  >
    {#each options as option}
      <option value={option.value} class:selected={option.selected}
        >{option.content}</option
      >
    {/each}
  </select>
{/if}
