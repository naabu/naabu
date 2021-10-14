<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "published";
  export let goal;

  let mainTabs = [
    {
      value: "published",
      text: "Gepubliceerd (" + goal.publishedAdventures.length + ")",
      url: "/leerdoel/" + goal.id + "/avonturen",
    },
    {
      value: "needs-approval",
      text: "Goedkeuring nodig (" + goal.needsApprovalAdventures.length + ")",
      url: "/leerdoel/" + goal.id + "/avonturen/goedkeuring",
    },
    {
      value: "in-progress",
      text: "In uitvoering (" + goal.inProgressAdventures.length + ")",
      url: "/leerdoel/" + goal.id + "/avonturen/uitvoering",
    },
    {
      value: "needs-work",
      text: "Heeft werk nodig (" + goal.needsWorkAdventures.length + ")",
      url: "/leerdoel/" + goal.id + "/avonturen/werk-nodig",
    },
    {
      value: "in-trash",
      text: "Prullenbak (" + goal.trashCanAdventures.length + ")",
      url: "/leerdoel/" + goal.id + "/avonturen/prullenbak",
    },
  ];
</script>

<Tabs bind:mainTabs bind:mainSelected />
