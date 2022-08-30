<script>
  import EditCurriculumProfile from "$lib/Goal/Curriculum/Components/edit.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { t } from "svelte-intl-precompile";
  import { user, player } from "$lib/Internals/User/store";
 

  let curriculumProfile;
  let mounted = false;

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();
  
  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    if ($user && $player.curriculumProfileId) {
      let ref = db
        .collection("curriculumProfile")
        .doc($player.curriculumProfileId);
      let snap = await ref.get();
      if (snap.exists) {
        curriculumProfile = snap.data();
        curriculumProfile.id = ref.id;
      }
    }
  }
  let breadcrumbs = [
    {
      url: "/curriculum",
      value: $t("curriculum"),
    },
    {
      url: "/curriculum-profiel/wijzigen",
      value: $t("update-curriculum-profile"),
    },
  ];
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title={$t("update-curriculum-profile")}
/>
{#if mounted}
  <EditCurriculumProfile  bind:curriculumProfile />
{/if}
