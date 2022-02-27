<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let goal;

  let mainTabs = [
    {
      value: "goal",
      text: $t("overview"),
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "activities",
      text: $t("activities"),
      url: "/leerdoel/" + goal.id + "/activiteiten",
    },
    {
      value: "connections",
      text: $t("connections"),
      url: "/leerdoel/" + goal.id + "/verbindingen",
    },
    {
      value: "talk",
      text: $t("discuss"),
      url: "/overleg/" +  goal.id + "/" + goal.talkId,
    },
  ];

  let subTabs = [
    {
      value: "read",
      text: $t("show"),
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "edit",
      text: t("edit"),
      url: "/leerdoel/" + goal.id + "/wijzigen",
    },
    {
      value: "history",
      text: $t("history"),
      url: "/leerdoel/" + goal.id + "/geschiedenis",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
