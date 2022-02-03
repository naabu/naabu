<script>
  export let title;
  export let description;
</script>

<div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      {description}
    </p>
  </div>
  <slot />
</div>
