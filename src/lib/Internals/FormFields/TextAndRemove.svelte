<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button/Button.svelte";
  import AdditionalFormText from "./AdditionalFormText.svelte";
  import { t } from "svelte-intl-precompile";
  export let items = [];
  export let noItemsMessage;
  const dispatch = createEventDispatcher();
  export let dataTest = "text-and-remove-button-";

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
  class="sm:grid sm:grid-cols-5 space-between justify-items-start items-center"
>
  {#each items as item, i}
    <div class="col-span-3">
      <slot name="show" {item}>
        {item}
      </slot>
    </div>
    <div class="col-span-2 justify-self-end">
      <slot name="extra-actions"/>
      <Button
        size="very-small"
        extraClasses={[]}
        color="secondary"
        content={$t("remove")}
        dataTest={dataTest + i}
        on:click={() => remove(item, i)}
      />
    </div>
  {/each}
</div>
