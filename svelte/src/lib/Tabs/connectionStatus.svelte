<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "published";
  export let goal;
  export let type;
  export let publishedArray;
  export let needsApprovalArray;
  export let inProgressArray;
  export let needsWorksArray;
  export let trashCanArray;

  let mainTabs = [
    {
      value: "published",
      text: "Gepubliceerd (" + publishedArray.length  +")",
      url: "/leerdoel/" + goal.id + "/" + type,
    },
    {
      value: "needs-approval",
      text: "Goedkeuring nodig ("+ needsApprovalArray.length +")",
      url: "/leerdoel/" +  goal.id + "/" + type + "/goedkeuring",
    },
    {
      value: "in-progress",
      text: "In uitvoering ("+ inProgressArray.length +")",
      url: "/leerdoel/" +  goal.id + "/" + type + "/uitvoering",
    },
    {
      value: "needs-work",
      text: "Heeft werk nodig ("+ needsWorksArray.length +")",
      url: "/leerdoel/" +  goal.id + "/" + type + "/werk-nodig",
    },
    {
      value: "in-trash",
      text: "Prullenbak ("+ trashCanArray.length +")" ,
      url: "/leerdoel/" +  goal.id + "/" + type + "/prullenbak",
    },
  ];

</script>

<Tabs bind:mainTabs bind:mainSelected />
