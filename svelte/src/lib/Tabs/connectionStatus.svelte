<script>
  import Tabs from "$lib/Tabs/tabs.svelte";
  export let mainSelected = "published";
  export let goal;
  export let urlType;
  export let publishedCount;

  export let needsApprovalCount;
  export let inProgressCount;
  export let needsWorksCount;
  export let trashCanCount;

  let mainTabs;

  $: mainTabs = [
    {
      value: "published",
      text: "Gepubliceerd (" + publishedCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType,
    },
    {
      value: "needs-approval",
      text: "Goedkeuring nodig (" + needsApprovalCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/goedkeuring",
    },
    {
      value: "in-progress",
      text: "In uitvoering (" + inProgressCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/uitvoering",
    },
    {
      value: "needs-work",
      text: "Heeft werk nodig (" + needsWorksCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/werk-nodig",
    },
    {
      value: "in-trash",
      text: "Prullenbak (" + trashCanCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/prullenbak",
    },
  ];

</script>

<Tabs bind:mainTabs bind:mainSelected />
