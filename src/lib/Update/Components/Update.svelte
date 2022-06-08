<script>
  export let i = 0;
  export let feedLength = 1;
</script>

<li>
  <div class="relative pb-8">
    {#if i < feedLength - 1}
      <!-- Vertical Line -->
      <span
        class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
        aria-hidden="true"
      />
    {/if}
    <div class="relative flex items-start space-x-3">
      <div class="relative">
        <slot name="icon">/></slot>
      </div>
      <div class="min-w-0 flex-1">
        <slot>Content</slot>
      </div>
    </div>
  </div>
</li>
