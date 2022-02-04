<script>
  export let connection;
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import Textarea from "../../../Internals/FormFields/Textarea.svelte";

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

<Textarea
  id="description"
  title="Omschrijving verbinding"
  rows="5"
  bind:value={connection.description}
/>
