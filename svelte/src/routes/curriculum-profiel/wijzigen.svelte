<script>
  import EditCurriculumProfile from "$lib/Curriculum/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Interals/Containers/breadcrumbPageTitle.svelte";

  let firebase;

  let curriculumProfile;
  let mounted = false;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();
  
  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    if ($session.user && $session.player.curriculumProfileId) {
      let ref = db
        .collection("curriculumProfile")
        .doc($session.player.curriculumProfileId);
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
      value: "Curriculum",
    },
    {
      url: "/curriculum-profiel/wijzigen",
      value: "Curriculum profiel wijzigen",
    },
  ];
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title="Curriculum profiel wijzigen"
/>
{#if mounted}
  <EditCurriculumProfile bind:firebase bind:curriculumProfile />
{/if}
