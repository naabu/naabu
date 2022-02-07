<script>
  import AdditionalFormText from "./AdditionalFormText.svelte";

  export let title;
  export let description;
</script>

<div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
  <div>
    {#if title}
      <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
    {/if}
    {#if description}
      <p class="mt-1 max-w-2xl">
        <AdditionalFormText content={description} />
      </p>
    {/if}
  </div>
  <slot />
</div>
