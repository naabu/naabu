<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "overview";
  export let goal;

  let mainTabs = [
    {
      value: "overview",
      text: $t("overview"),
      url: "/leerdoel/" + goal.id + "/verbindingen",
    },
    {
      value: "goal-prerequisites",
      text: $t("prior-knowledge"),
      url: "/leerdoel/" + goal.id + "/voorkennis",
    },
    {
      value: "goal-specializations",
      text: $t("specialization"),
      url: "/leerdoel/" + goal.id + "/specialisatie",
    },
    {
      value: "goal-bigideas",
      text: $t("big-ideas"),
      url: "/leerdoel/" + goal.id + "/groot-idee",
    },
    {
      value: "goal-deeperunderstandings",
      text: $t("deeper-insight"),
      url: "/leerdoel/" + goal.id + "/dieper-inzicht",
    },
  ];
</script>

<Tabs bind:mainTabs bind:mainSelected />
