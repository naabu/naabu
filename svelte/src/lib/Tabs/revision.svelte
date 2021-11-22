<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let revision;

  let mainTabs = [
    {
      value: "goal",
      text: "Overview",
      url: "/revisie/" + revision.revisionId,
    },
    {
      value: "activities",
      text: "Activiteiten",
      url: "/leerdoel/" + revision.goalId + "/activiteiten",
    },
    {
      value: "connections",
      text: "Verbindingen",
      url: "/leerdoel/" + revision.goalId + "/verbindingen",
    },
    {
      value: "talk",
      text: "Overleg",
      url: "/leerdoel/" + revision.goalId + "/overleg",
    },
  
  ];

  let subTabs = [
    {
      value: "read",
      text: "Lezen",
      url: "/revisie/" + revision.revisionId,
    },
    {
      value: "edit",
      text: "Bewerken",
      url: "/revisie/" + revision.revisionId + "/wijzigen",
    },
    {
      value: "history",
      text: "Geschiedenis",
      url: "/leerdoel/" + revision.goalId + "/geschiedenis",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
