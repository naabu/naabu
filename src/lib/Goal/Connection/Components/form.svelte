<script>
  export let connection;
  import Radio from "$lib/Internals/FormFields/Radio.svelte";

  export let radioOptions = [
    {
      value: "goal-prerequisites",
      label: "Voorkennis",
      description: "Leerdoel 2 is eerst nodig om leerdoel 1 te kunnen leren.",
    },
    {
      value: "goal-specializations",
      label: "Specializatie",
      description: "Leerdoel 2 is eerst nodig om leerdoel 1 te kunnen leren.",
    },
    {
      value: "goal-bigideas",
      label: "Grote ideeën",
      description: "Leerdoel 2 is een groot idee van Leerdoel 1.",
    },
    {
      value: "goal-deeperunderstandings",
      label: "Diepere inzichten",
      description: " Leerdoel 2 is geeft een dieper inzicht in Leerdoel 1. ",
    },
  ];
</script>

<Radio
  bind:selectedValue={connection.type}
  options={radioOptions}
  title="Type verbinding"
/>

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
