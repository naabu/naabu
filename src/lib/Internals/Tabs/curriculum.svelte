<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "curriculum";
  export let subSelected = "read";
  export let curriculumProfile;
  export let isOwnProfile = false;

  let mainTabs;
  let subTabs;

  $: {
    if (isOwnProfile) {
      mainTabs = [
        {
          value: "curriculum",
          text: $t("curriculum-profile"),
          url: "/curriculum-profiel/mijn-profiel",
        },
      ];
    } else {
      mainTabs = [
        {
          value: "curriculum",
          text: $t("curriculum-profile"),
          url: "/curriculum-profiel/" + curriculumProfile.id,
        },
      ];
    }
    if (isOwnProfile) {
      subTabs = [
        {
          value: "read",
          text: $t("show"),
          url: "/curriculum-profiel/mijn-profiel",
        },
        {
          value: "edit",
          text: $t("edit"),
          url: "/curriculum-profiel/wijzigen",
        },
      ];
    } else {
      subTabs = [
        {
          value: "read",
          text: $t("show"),
          url: "/curriculum-profiel/" + curriculumProfile.id,
        },
      ];
    }
  }
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
