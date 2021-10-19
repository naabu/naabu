<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "curriculum";
  export let subSelected = "read";
  export let curriculumProfile;
  export let isOwnProfile = false;
  export let isNew = false;

  let mainTabs;
  let subTabs;

  $: {
    if (isNew) {
      mainTabs = [
        {
          value: "create",
          text: "Profiel aanmaken",
          url: "/curriculum-profiel/maken",
        },
      ];
    } else if (isOwnProfile) {
      mainTabs = [
        {
          value: "curriculum",
          text: "Curriculum profiel",
          url: "/curriculum-profiel/mijn-profiel",
        },
      ];
    } else {
      mainTabs = [
        {
          value: "curriculum",
          text: "Curriculum profiel",
          url: "/curriculum-profiel/" + curriculumProfile.id,
        },
      ];
    }
    // {
    //   value: "talk",
    //   text: "Overleg",
    //   url: "/profcurriculum-profiel/" + curriculumProfile.id + "/overleg",
    // },

    if (!isNew) {
      if (isOwnProfile) {
        subTabs = [
          {
            value: "read",
            text: "Lezen",
            url: "/curriculum-profiel/mijn-profiel",
          },
          {
            value: "edit",
            text: "Bewerken",
            url: "/curriculum-profiel/wijzigen",
          },
        ];
      } else {
        subTabs = [
          {
            value: "read",
            text: "Lezen",
            url: "/curriculum-profiel/" + curriculumProfile.id,
          },
        ];
      }
    }
  }
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
