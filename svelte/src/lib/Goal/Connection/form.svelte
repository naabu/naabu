<script>
  export let connection;
</script>

<div class="mt-6 sm:border-t sm:border-gray-200 sm:pt-5">
  <div role="group" aria-labelledby="label-type">
    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
      <div>
        <div
          class="mb-40text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
          id="label-type"
        >
          Type verbinding
        </div>
      </div>
      <div class="mt-4 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg space-y-4">
          <div>
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="prerequisites"
                  name="prerequisites"
                  value="prerequisites"
                  bind:group={connection.type}
                  type="radio"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="prerequisites" class="font-medium text-gray-700"
                  >Voorkennis</label
                >
                <p class="text-gray-500">
                  Leerdoel 2 is eerst nodig om leerdoel 1 te kunnen leren.
                </p>
              </div>
            </div>
          </div>
          <div class="relative flex items-start">
            <div class="flex items-center h-5">
              <input
                id="specializations"
                name="specializations"
                value="specializations"
                bind:group={connection.type}
                type="radio"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="specializations" class="font-medium text-gray-700"
                >Specializatie</label
              >
              <p class="text-gray-500">
                Als je leerdoel 1 hebt geleerd kan je leerdoel 2 leren.
              </p>
            </div>
          </div>
          <div>
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="bigideas"
                  name="bigideas"
                  value="bigideas"
                  bind:group={connection.type}
                  type="radio"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="bigideas" class="font-medium text-gray-700"
                  >Grote ideeën</label
                >
                <p class="text-gray-500">
                  Leerdoel 2 is een groot idee van Leerdoel 1. 
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="relative flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="deeperunderstandings"
                  name="deeperunderstandings"
                  value="deeperunderstandings"
                  bind:group={connection.type}
                  type="radio"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="deeperunderstandings" class="font-medium text-gray-700"
                  >Diepere inzichten</label
                >
                <p class="text-gray-500">
                  Leerdoel 2 is geeft een dieper inzicht in Leerdoel 1. 
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
    for="description"
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    Omschrijving verbinding
  </label>
  <div class="mt-1 sm:mt-0 sm:col-span-2">
    <textarea
      id="description"
      name="description"
      rows="5"
      bind:value={connection.description}
      class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
    />
  </div>
</div>
