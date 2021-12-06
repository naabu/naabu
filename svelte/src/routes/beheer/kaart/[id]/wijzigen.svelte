<script>
  import Edit from "$lib/Map/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";

  let firebase;
  let ref;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      const db = await firebase.firestore();
      ref = db.collection("maps").doc($page.params.id);
    }
  })();
</script>

{#if firebase && ref}
  <Edit bind:ref bind:firebase />
{/if}
