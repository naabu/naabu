<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "overview";

  let mainTabs = [
    {
      value: "map",
      text: "Kaarten",
      url: "/beheer/kaart",
    }
  ];
</script>

<Tabs bind:mainTabs bind:mainSelected />
