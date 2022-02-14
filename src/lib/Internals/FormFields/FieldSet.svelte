<script>
  import AdditionalFormText from "./AdditionalFormText.svelte";

  export let title;
  export let description;
  export let layout = "labels-on-left";
</script>

{#if layout === "labels-on-left"}
  <div class="divide-y divide-gray-200 space-y-6 sm:space-y-5">
    {#if title || description}
      <div class="pt-8 sm:pt-10">
        {#if title}
          <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        {/if}
        {#if description}
          <p class="mt-1 max-w-2xl">
            <AdditionalFormText content={description} />
          </p>
        {/if}
      </div>
    {/if}
    <slot />
  </div>
{:else if layout === "two-column-full-width-cards"}
  <!-- <div class="space-y-6"> -->
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <slot name="top"/>
        {#if title || description}
          {#if title}
            <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          {/if}
          {#if description}
            <p class="mt-1 max-w-2xl">
              <AdditionalFormText content={description} />
            </p>
          {/if}
        {/if}
      </div>
      <div class="md:col-span-2">
        <slot />
      </div>
    </div>
  </div>
{/if}
