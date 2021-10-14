<script>
  export let adventure;

  $: console.log(adventure);
</script>

<div class="mt-6 sm:border-t sm:border-gray-200 sm:pt-5">
  <div role="group" aria-labelledby="label-type">
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
      <div>
        <div
          class="mb-40text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
          id="label-type"
        >
          Type avontuur
        </div>
      </div>
      <div class="mt-4 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg space-y-4">
          <div>
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="explanation"
                  name="explanation"
                  value="explanation"
                  bind:group={adventure.type}
                  type="radio"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="multistructureel" class="font-medium text-gray-700"
                  >Uitleg</label
                >
                <p class="text-gray-500">
                  Activiteit bevat uitleg om het leerdoel te leren.
                </p>
              </div>
            </div>
          </div>
          <div class="relative flex items-start">
            <div class="flex items-center h-5">
              <input
                id="practice"
                name="practice"
                value="practice"
                bind:group={adventure.type}
                type="radio"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="unistructureel" class="font-medium text-gray-700"
                >Oefening</label
              >
              <p class="text-gray-500">
                Activiteit is een oefening voor het leerdoel.
              </p>
            </div>
          </div>
          <div>
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="boss"
                  name="boss"
                  value="boss"
                  bind:group={adventure.type}
                  type="radio"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="relationeel" class="font-medium text-gray-700"
                  >Eindbaas</label
                >
                <p class="text-gray-500">
                  Een eindbaas type ontgrendeld de locaties op de kaart
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label
    for="difficulty"
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    Difficulty
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    <input
      id="difficulty"
      name="difficulty"
      type="number"
      min="1"
      max="5"
      bind:value={adventure.difficulty}
      class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
    />
  </div>
</div>
<div
  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
>
  <label
    for="svg"
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    SVG
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    <textarea
      id="svg"
      name="svg"
      rows="5"
      bind:value={adventure.svg}
      class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
    />
  </div>
</div>
