<script>
  import Update from "$lib/Update/Components/Update.svelte";
  import LinkComponent from "$lib/Update/Components/LinkComponent.svelte";
  import { t } from "svelte-intl-precompile";
  export let i = 0;
  export let feedLength = 1;
  export let update;
  export let showConnectionInfo;
</script>

{#if update}
  <Update bind:i bind:feedLength>
    <svelte:fragment slot="icon">
      <slot name="icon">Icon</slot>
    </svelte:fragment>
    <div class="min-w-0 flex-1 py-1.5 text-sm text-gray-500">
      <slot />
      <slot name="connectionInfo">
        <LinkComponent bind:showConnectionInfo bind:update />
      </slot>
    </div>
  </Update>
{/if}
