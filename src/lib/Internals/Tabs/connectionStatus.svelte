<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "published";
  export let goal;
  export let urlType;
  export let publishedCount;

  export let needsApprovalCount;
  export let inProgressCount;
  export let needsWorksCount;
  export let trashCanCount;

  let mainTabs;

  $: mainTabs = [
    {
      value: "published",
      text: $t("published") + "(" + publishedCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType,
    },
    {
      value: "needs-approval",
      text: $t("needs-approval") + "(" + needsApprovalCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/goedkeuring",
    },
    {
      value: "in-progress",
      text: $t("in-progress") + "(" + inProgressCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/uitvoering",
    },
    {
      value: "needs-work",
      text: $t("needs-work") + "(" + needsWorksCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/werk-nodig",
    },
    {
      value: "in-trash",
      text: $t("in-trash") + "(" + trashCanCount + ")",
      url: "/leerdoel/" + goal.id + "/" + urlType + "/prullenbak",
    },
  ];
</script>

<Tabs bind:mainTabs bind:mainSelected />
