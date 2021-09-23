<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "curriculum";
  export let subSelected = "read";
  export let curriculum;

  let mainTabs = [
    {
      value: "curriculum",
      text: "Curriculum profiel",
      url: "/curriculum-profiel/" + curriculum.id,
    },
    {
      value: "talk",
      text: "Overleg",
      url: "/profcurriculum-profiel/" + curriculum.id + "/overleg",
    },
  ];

  let subTabs = [
    {
      value: "read",
      text: "Lezen",
      url: "/curriculum-profiel/" + curriculum.id,
    },
    {
      value: "edit",
      text: "Bewerken",
      url: "/curriculum-profiel//" + curriculum.id + "/wijzig",
    },
    {
      value: "history",
      text: "Geschiedenis",
      url: "/curriculum-profiel//" + curriculum.id + "/geschiedenis",
    },
  ];
</script>


<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected/>
