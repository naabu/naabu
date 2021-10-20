<script>
  import CurriculumProfile from "$lib/Curriculum/profile.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { goto } from "$app/navigation";

  let firebase;

  let curriculumProfile;
  let mounted = false;

  onMount(async () => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    if ($session.player) {
      console.log($session.player.curriculumProfileId);
      let ref = db.collection("curriculumProfile").doc($session.player.curriculumProfileId);
      let snap = await ref.get();
      if (snap.exists) {
        curriculumProfile = snap.data();
        curriculumProfile.id = ref.id;
      }
      else {
        delete $session.player.curriculumProfileId;
        await goto("/curriculum-profiel/maken");
      }
    }
  }
</script>

{#if mounted}
  <CurriculumProfile bind:curriculumProfile isOwnProfile="true" />
{/if}
