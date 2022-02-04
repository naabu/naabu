<script>
  export let id = "textarea-id";
  export let title;
  export let value;
  export let rows = 1;
  export let required = false;
</script>

<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label
    for={id}
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    {title}
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    <textarea
      {id}
      name={id}
      {rows}
      {required}
      bind:value
      class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
    />
    <slot name="after"/>
  </div>
</div>
