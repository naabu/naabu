<script>
  import EditGoal from "$lib/Goal/Components/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";

  let firebase;
  let ref;
  let battleCol;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      let db = await firebase.firestore();
      ref = db.collection("goals").doc($page.params.id);
      battleCol = db.collection("goals/" + $page.params.id + "/battles");
    }
  })();
</script>

{#if firebase && ref}
  <EditGoal bind:goalRef={ref} bind:battleCol bind:firebase />
{/if}
