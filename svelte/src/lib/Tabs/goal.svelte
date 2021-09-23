<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let goal;

  let mainTabs = [
    {
      value: "goal",
      text: "Leerdoel",
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "talk",
      text: "Overleg",
      url: "/leerdoel/" + goal.id + "/overleg",
    },
    {
      value: "adventures",
      text: "Avonturen",
      url: "/leerdoel/" + goal.id + "/avonturen",
    },
  ];

  let subTabs = [
    {
      value: "read",
      text: "Lezen",
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "edit",
      text: "Bewerken",
      url: "/beheer/leerdoel/" + goal.id + "/wijzigen",
    },
    {
      value: "history",
      text: "Geschiedenis",
      url: "/leerdoel/" + goal.id + "/geschiedenis",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
