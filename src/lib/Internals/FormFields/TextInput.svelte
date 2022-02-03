<script>
  export let id = "input-id";
  export let title;
  export let value;
  export let required = false;
  export let dataTest = "inputText";
  export let autocomplete = "off";
</script>

<div
  class="mt-4 mb-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  {#if title}
    <label
      for={id}
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      {title}
    </label>
  {/if}

  <div class="mt-1 mb-1 sm:mt-0 sm:col-span-2">
    <slot name="above-input" />
    <input
      type="text"
      on:keypress
      on:keyup
      bind:value
      {required}
      data-test={dataTest}
      name={id}
      {id}
      {autocomplete}
      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
    />
    <slot name="below-input" />
  </div>
</div>
