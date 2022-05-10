<script>
  import Update from "$lib/Update/Components/Update.svelte";
  import { t } from "svelte-intl-precompile";
  export let i = 0;
  export let feedLength = 1;
  export let update;
</script>

{#if update}
  <Update bind:i bind:feedLength>
    <svelte:fragment slot="icon">
      <slot name="icon">Icon</slot>
    </svelte:fragment>
    <div>
      <div class="text-sm">
        {#if update.curriculumProfile}
          <a
            href="/curriculum-profiel/{update.curriculumProfile.id}"
            class="font-medium text-gray-900"
            >{update.curriculumProfile.fullname}</a
          >
          <slot name="aftername" />
        {:else}
          <span class="font-medium text-gray-900">{$t("teacher")}</span>
        {/if}
      </div>
      <p class="mt-0.5 text-sm text-gray-500">
        {#if update.createdAtTimeAgo}
          {update.createdAtTimeAgo}
        {/if}
      </p>
    </div>
    <div class="mt-2 ">
      <p data-test="status-content-{i}">
        <slot>
          {#if update.content}
            {update.content}
          {/if}
        </slot>
      </p>
    </div>
  </Update>
{/if}
