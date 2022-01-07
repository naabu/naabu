<script>
  import Show from "$lib/Activity/Components/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";

  let firebase;

  let activity;
  let mounted = false;
  let breadcrumbs = [
    {
      url: "/",
      value: "Reis",
    },
    {
      url: "/" + $page.params.id,
      value: "Activiteit bekijken",
    },
  ];

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("activities").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      activity = snap.data();
      activity.id = ref.id;
      // TODO: There can be multiple goals attached to an activity, support this?
      if (activity.goals.length > 0) {
        let battleCol = db.collection(
          "goals/" + activity.goals[0].objectID + "/battles"
        );
        const querySnapshot = await battleCol.get();
        activity.battles = [];
        querySnapshot.forEach((doc) => {
          let battleObject = doc.data();
          battleObject.name = doc.id;
          activity.battles = [...activity.battles, battleObject];
        });
      }
    }
  }
</script>

{#if mounted && activity}
  <Show bind:activity bind:breadcrumbs bind:firebase />
{/if}
