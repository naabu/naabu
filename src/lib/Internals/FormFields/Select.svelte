<script>
  export let id = "select-id";
  export let title;
  export let value;
  export let options = [];
</script>

<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label for={id} class="block text-sm font-medium text-gray-700">
    {title}
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <select
        multiple
        bind:value
        {id}
        name={id}
        class="resize-y max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
      >
        {#each options as option}
          <option value={option.value}>{option.content}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
