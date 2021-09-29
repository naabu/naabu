<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "talk";
  export let subSelected = "read";
  export let objectId;
  export let talkId;
  export let talkType;

  let mainTabs = [];
  let subTabs = [];
  if (talkType === "goal") {
    mainTabs = [
      {
        value: "goal",
        text: "Leerdoel",
        url: "/leerdoel/" + objectId,
      },
      {
        value: "talk",
        text: "Overleg",
        url: "/overleg/" + objectId + "/" + talkId,
      },
      {
        value: "adventures",
        text: "Avonturen",
        url: "/leerdoel/" + objectId + "/avonturen",
      },
    ];

    subTabs = [
      {
        value: "read",
        text: "Lezen",
        url: "/overleg/" + objectId + "/" +talkId,
      },
      {
        value: "edit",
        text: "Bewerken",
        url: "/beheer/leerdoel/" + objectId + "/wijzigen",
      },
      {
        value: "history",
        text: "Geschiedenis",
        url: "/leerdoel/" + objectId + "/geschiedenis",
      },
    ];
  }
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
