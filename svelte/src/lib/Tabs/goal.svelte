<script>
  import Tabs from "$lib/Tabs/tabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let goal;

  let mainTabs = [
    {
      value: "goal",
      text: "Overview",
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "activities",
      text: "Activiteiten",
      url: "/leerdoel/" + goal.id + "/activiteiten",
    },
    {
      value: "connections",
      text: "Verbindingen",
      url: "/leerdoel/" + goal.id + "/verbindingen",
    },
    {
      value: "talk",
      text: "Overleg",
      url: "/overleg/" +  goal.id + "/" + goal.talkId,
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
      url: "/leerdoel/" + goal.id + "/wijzigen",
    },
    {
      value: "history",
      text: "Geschiedenis",
      url: "/leerdoel/" + goal.id + "/geschiedenis",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
