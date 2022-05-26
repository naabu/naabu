<script>
  import Show from "$lib/Activity/Components/show.svelte";
  import { getStores, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";

 

  let activity;
  let mounted = false;
  let breadcrumbs = [
    {
      url: "/",
      value: $t("the-journey"),
    },
    {
      url: "/" + $page.params.id,
      value: $t("show-activity"),
    },
  ];

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("activities").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      activity = snap.data();
      activity.id = ref.id;
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
  <Show bind:activity bind:breadcrumbs  />
{/if}
