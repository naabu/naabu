<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button/Button.svelte";
  import AdditionalFormText from "./AdditionalFormText.svelte";

  export let items = [];
  export let noItemsMessage;
  const dispatch = createEventDispatcher();
  export let dataTest = "text-and-remove-button-"

  export function remove(item, i) {
    dispatch("remove", {
      item: item,
      i: i,
    });
  }
</script>

{#if items.length == 0 && noItemsMessage}
  <AdditionalFormText content={noItemsMessage} />
{/if}
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
      dataTest={dataTest + i}
      on:click={() => remove(item, i)}
    />
  {/each}
</div>
