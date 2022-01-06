<script>
  import Tabs from "$lib/Tabs/tabs.svelte";
  export let mainSelected = "overview";
  export let goal;

  let mainTabs = [
    {
      value: "overview",
      text: "Overzicht",
      url: "/leerdoel/" + goal.id + "/verbindingen",
    },
    {
      value: "goal-prerequisites",
      text: "Voorkennis",
      url: "/leerdoel/" +  goal.id + "/voorkennis",
    },
    {
      value: "goal-specializations",
      text: "Specialisatie",
      url: "/leerdoel/" +  goal.id + "/specialisatie",
    },
    {
      value: "goal-bigideas",
      text: "Grote ideeën",
      url: "/leerdoel/" +  goal.id + "/groot-idee",
    },
    {
      value: "goal-deeperunderstandings",
      text: "Diepere inzichten" ,
      url: "/leerdoel/" +  goal.id + "/dieper-inzicht",
    },
  ];

</script>

<Tabs bind:mainTabs bind:mainSelected />
