<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
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
        text: $t("goal"),
        url: "/leerdoel/" + objectId,
      },

      {
        value: "activities",
        text: $t("activities"),
        url: "/leerdoel/" + objectId + "/activiteiten",
      },
      {
        value: "assessments",
        text: $t("assessments"),
        url: "/leerdoel/" + objectId + "/assessments",
      },
      {
        value: "knowledge-components",
        text: $t("knowledge-components"),
        url: "/leerdoel/" + objectId + "/knowledge-components",
      },
      // {
      //   value: "connections",
      //   text: $t("connections"),
      //   url: "/leerdoel/" + objectId + "/verbindingen",
      // },
      {
        value: "talk",
        text: $t("discuss"),
        url: "/overleg/" + objectId + "/" + talkId,
      },
    ];

    subTabs = [
      {
        value: "read",
        text: $t("show"),
        url: "/overleg/" + objectId + "/" + talkId,
      },
      {
        value: "edit",
        text: $t("edit"),
        url: "/leerdoel/" + objectId + "/wijzigen",
      },
      {
        value: "history",
        text: $t("history"),
        url: "/leerdoel/" + objectId + "/geschiedenis",
      },
    ];
  }
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
