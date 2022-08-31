<script>
  import CurriculumProfile from "$lib/Goal/Curriculum/Components/profile.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";
 

  let curriculumProfile;
  let mounted = false;
  let isOwnProfile = false;

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("curriculumProfile").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      curriculumProfile = snap.data();
      curriculumProfile.id = ref.id;

      if ($user && curriculumProfile.uid === $user.uid) {
        isOwnProfile = true;
      }
    }
  }
</script>

{#if mounted}
  <CurriculumProfile bind:curriculumProfile bind:isOwnProfile />
{/if}
