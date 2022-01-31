<script>
  export let selectedValue;
  export let title;
  export let options = [
    {
      value: "value",
      label: "label",
      description: "description",
    },
  ];
</script>

<div class="mt-6 sm:border-t sm:border-gray-200 sm:pt-5">
  <div role="group" aria-labelledby="label-type">
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
      <div>
        {#if title}
          <div
            class="mb-40text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
            id="label-type"
          >
            {title}
          </div>
        {/if}
      </div>
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
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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
          <slot name="after-options" />
        </div>
      </div>
    </div>
  </div>
</div>
