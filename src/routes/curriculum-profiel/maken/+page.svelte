<script>
  import MakeCurriculumProfile from "$lib/Goal/Curriculum/Components/create.svelte";
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
    if ($user) {
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
      url: "/curriculum-profiel/maken",
      value: $t("create-curriculum-profile"),
    },
  ];
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title={$t("create-curriculum-profile")}
/>
{#if mounted && !curriculumProfile}
  <MakeCurriculumProfile />
{/if}
