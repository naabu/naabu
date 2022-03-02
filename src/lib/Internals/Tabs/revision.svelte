<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let revision;

  let mainTabs = [
    {
      value: "goal",
      text: $t("overview"),
      url: "/revisie/" + revision.revisionId,
    },
    {
      value: "activities",
      text: $t("activities"),
      url: "/leerdoel/" + revision.goalId + "/activiteiten",
    },
    {
      value: "connections",
      text: $t("connections"),
      url: "/leerdoel/" + revision.goalId + "/verbindingen",
    },
    {
      value: "talk",
      text: $t("discuss"),
      url: "/leerdoel/" + revision.goalId + "/overleg",
    },
  ];

  let subTabs = [
    {
      value: "read",
      text: $t("show"),
      url: "/revisie/" + revision.revisionId,
    },
    {
      value: "edit",
      text: $t("edit"),
      url: "/revisie/" + revision.revisionId + "/wijzigen",
    },
    {
      value: "history",
      text: $t("history"),
      url: "/leerdoel/" + revision.goalId + "/geschiedenis",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
