<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let revision;

  let mainTabs = [
    {
      value: "goal",
      text: "Leerdoel",
      url: "/revisie/" + revision.id,
    },
    {
      value: "talk",
      text: "Overleg",
      url: "/leerdoel/" + revision.goalId + "/overleg",
    },
    {
      value: "adventures",
      text: "Avonturen",
      url: "/leerdoel/" + revision.goalId + "/avonturen",
    },
  ];

  let subTabs = [
    {
      value: "read",
      text: "Lezen",
      url: "/revisie/" + revision.id,
    },
    {
      value: "edit",
      text: "Bewerken",
      url: "/revisie/" + revision.id + "/wijzigen",
    },
    {
      value: "history",
      text: "Geschiedenis",
      url: "/leerdoel/" + revision.goalId + "/geschiedenis",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
