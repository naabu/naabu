<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "overview";
  export let goal;

  let mainTabs = [
    {
      value: "overview",
      text: "Overzicht",
      url: "/leerdoel/" + goal.id + "/verbindingen",
    },
    {
      value: "prerequist",
      text: "Voorkennis",
      url: "/leerdoel/" +  goal.id + "/voorkennis",
    },
    {
      value: "specialization",
      text: "Specialisatie",
      url: "/leerdoel/" +  goal.id + "/specialisatie",
    },
    {
      value: "big-ideas",
      text: "Grote ideeën",
      url: "/leerdoel/" +  goal.id + "/groot-idee",
    },
    {
      value: "deeper-understandings",
      text: "Diepere inzichten" ,
      url: "/leerdoel/" +  goal.id + "/dieper-inzicht",
    },
  ];

</script>

<Tabs bind:mainTabs bind:mainSelected />
