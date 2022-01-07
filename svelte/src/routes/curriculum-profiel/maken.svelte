<script>
  import MakeCurriculumProfile from "$lib/Goal/Curriculum/Components/create.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";

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
    if ($session.user) {
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
      url: "/curriculum-profiel/maken",
      value: "Curriculum profiel maken",
    },
  ];
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title="Curriculum profiel maken"
/>
{#if mounted && !curriculumProfile}
  <MakeCurriculumProfile bind:firebase />
{/if}
