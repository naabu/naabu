<script>
  import CurriculumProfile from "$lib/Curriculum/profile.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";

  let firebase;

  let curriculumProfile;
  let mounted = false;
  let isOwnProfile = false;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("curriculumProfile").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      curriculumProfile = snap.data();
      curriculumProfile.id = ref.id;

      if ($session.user && curriculumProfile.uid === $session.user.uid) {
        isOwnProfile = true;
      }
    }
  }
</script>

{#if mounted}
  <CurriculumProfile bind:curriculumProfile bind:isOwnProfile />
{/if}
