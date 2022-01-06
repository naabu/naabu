<script>
  import CurriculumProfile from "$lib/Curriculum/profile.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import { goto } from "$app/navigation";
  import ContainerBreadcrumpPageTitle from "$lib/Interals/Containers/breadcrumbPageTitle.svelte";

  let firebase;

  let curriculumProfile;
  let mounted = false;

  $: if ($session.player && mounted) {
    retrieveFirestoreData();
  }
  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
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
      value: "Curriculum",
    },
    {
      url: "/curriculum-profiel/mijn-profiel",
      value: "Mijn profiel",
    },
  ];
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title="Mijn curriculum profiel"
/>

{#if mounted}
  <CurriculumProfile bind:curriculumProfile isOwnProfile="true" />
{/if}
