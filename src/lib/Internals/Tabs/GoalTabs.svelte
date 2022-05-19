<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let goalId;

  let mainTabs = [
    {
      value: "goal",
      text: $t("overview"),
      url: "/leerdoel/" + goalId,
    },
    {
      value: "activities",
      text: $t("activities"),
      url: "/leerdoel/" + goalId+ "/activiteiten",
    },
    {
      value: "assessments",
      text: $t("assessments"),
      url: "/leerdoel/" + goalId + "/assessments",
    },
    {
      value: "models",
      text: $t("models"),
      url: "/leerdoel/" +  goalId + "/models",
    },
    // {
    //   value: "connections",
    //   text: $t("connections"),
    //   url: "/leerdoel/" + goal.id + "/verbindingen",
    // },
  ];

  let subTabs = [
    {
      value: "edit",
      text: $t("edit"),
      url: "/leerdoel/" + goalId+ "/wijzigen",
    },
  ];
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
