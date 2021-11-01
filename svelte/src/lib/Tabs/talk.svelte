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
        value: "adventures",
        text: "Activiteiten",
        url: "/leerdoel/" + objectId + "/avonturen",
      },
      {
        value: "connections",
        text: "Verbindingen",
        url: "/leerdoel/" + objectId + "/verbindingen",
      },
      {
        value: "talk",
        text: "Overleg",
        url: "/overleg/" + objectId + "/" + talkId,
      },
    ];

    subTabs = [
      {
        value: "read",
        text: "Lezen",
        url: "/overleg/" + objectId + "/" + talkId,
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
