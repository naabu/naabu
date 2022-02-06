<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button/Button.svelte";

  export let items = [];
  const dispatch = createEventDispatcher();

  export function remove(item, i) {
    dispatch("remove", {
      item: item,
      i: i,
    });
  }
</script>

<div
  class="sm:grid sm:grid-cols-2 space-between justify-items-start items-center"
>
  {#each items as item, i}
    <slot name="show" {item}>
      {item}
    </slot>
    <Button
      size="very-small"
      color="secondary"
      content="Weghalen"
      on:click={() => remove(item, i)}
    />
  {/each}
</div>
