<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";

  export let firebase;

  export let activity;
  export let cloneActivity;
  export let mounted = false;
  export let activityId = $page.params.activityId;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("activities").doc(activityId);
    let snap = await ref.get();
    if (snap.exists) {
      activity = snap.data();
      activity.id = ref.id;
      cloneActivity = JSON.parse(JSON.stringify(activity));
    }
  }
</script>

<Firebase bind:firebase />
