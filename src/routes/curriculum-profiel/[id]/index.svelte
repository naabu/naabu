<script>
  import CurriculumProfile from "$lib/Goal/Curriculum/Components/profile.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";

  ;

  let curriculumProfile;
  let mounted = false;
  let isOwnProfile = false;

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
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
