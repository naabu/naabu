<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "overview";

  let mainTabs = [
    {
      value: "overview",
      text: "Overview",
      url: "/beheer",
    },
    {
      value: "activity",
      text: "Activiteiten",
      url: "/beheer/activiteit",
    },
    {
      value: "goal",
      text: "Leerdoelen",
      url: "/beheer/leerdoel",
    },
    {
      value: "map",
      text: "Kaarten",
      url: "/beheer/kaart",
    },
    {
      value: "user",
      text: "Gebruikers",
      url: "/beheer/gebruiker",
    },
  ];
</script>

<Tabs bind:mainTabs bind:mainSelected />
