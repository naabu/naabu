<script>
  import CurriculumProfile from "$lib/Goal/Curriculum/Components/profile.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { goto } from "$app/navigation";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { t } from "svelte-intl-precompile";

 

  let curriculumProfile;
  let mounted = false;

  $: if ($session.player && mounted) {
    retrieveFirestoreData();
  }
  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    if ($session.player) {
      let ref = db
        .collection("curriculumProfile")
        .doc($session.player.curriculumProfileId);
      let snap = await ref.get();
      if (snap.exists) {
        curriculumProfile = snap.data();
        curriculumProfile.id = ref.id;
      } else {
        delete $session.player.curriculumProfileId;
        await goto("/curriculum-profiel/maken");
      }
    }
  }

  let breadcrumbs = [
    {
      url: "/curriculum",
      value: $t("curriculum"),
    },
    {
      url: "/curriculum-profiel/mijn-profiel",
      value: $t("my-profile")
    },
  ];
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title={$t("my-curriculum-profile")}
/>

{#if mounted}
  <CurriculumProfile bind:curriculumProfile isOwnProfile="true" />
{/if}
