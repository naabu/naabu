<script>
  import Tabs from "./tabs.svelte";
  export let mainSelected = "curriculum";
  export let subSelected = "read";
  export let curriculumProfile;
  export let isOwnProfile = false;
  export let isNew = false;

  $: console.log(isOwnProfile);

  let mainTabs;
  let subTabs;

  function createSubTabs() {
    return [
      {
        value: "read",
        text: "Lezen",
        url: "/curriculum-profiel/" + curriculumProfile.id,
      },
    ];
  }

  $: {
    if (isNew) {
      mainTabs = [
        {
          value: "create",
          text: "Profiel aanmaken",
          url: "/curriculum-profiel/maken",
        },
      ];
    } else {
      mainTabs = [
        {
          value: "curriculum",
          text: "Curriculum profiel",
          url: "/curriculum-profiel/" + curriculumProfile.id,
        },
        // {
        //   value: "talk",
        //   text: "Overleg",
        //   url: "/profcurriculum-profiel/" + curriculumProfile.id + "/overleg",
        // },
      ];
      subTabs = createSubTabs();
      if (isOwnProfile) {
        subTabs.push({
          value: "edit",
          text: "Bewerken",
          url: "/curriculum-profiel/wijzigen",
        });
      }
    }
  }
</script>

<Tabs bind:mainTabs bind:subTabs bind:mainSelected bind:subSelected />
