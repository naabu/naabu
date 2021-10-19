<script>
  import EditCurriculumProfile from "$lib/Curriculum/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";

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
    if ($session.user && $session.user.idTokenResult.claims.curriculumProfileId) {
      let ref = db.collection("curriculumProfile").doc($session.user.idTokenResult.claims.curriculumProfileId);
      let snap = await ref.get();
      if (snap.exists) {
        curriculumProfile = snap.data();
        curriculumProfile.id = ref.id;
      }
    }
  }
</script>

{#if mounted}
  <EditCurriculumProfile bind:firebase bind:curriculumProfile />
{/if}
