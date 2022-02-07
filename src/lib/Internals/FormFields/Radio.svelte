<script>
  export let selectedValue;
  export let options = [
    {
      value: "value",
      label: "label",
      description: "description",
    },
  ];
</script>

<div class="mt-4 sm:mt-0 sm:col-span-2">
  <div class="max-w-lg space-y-4">
    {#each options as option}
      <div>
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input
              id={option.value}
              name={option.value}
              value={option.value}
              bind:group={selectedValue}
              type="radio"
              class="focus:ring-blue-600 h-4 w-4 text-blue-600 border-gray-300"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for={option.value} class="font-medium text-gray-700"
              >{option.label}</label
            >
            {#if option.description}
              <p class="text-gray-500">
                {option.description}
              </p>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
