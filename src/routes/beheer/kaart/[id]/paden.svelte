<script>
  import Paths from "$lib/Module/Map/Components/editPathForm.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";

  ;
  let ref;

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
      const db = await firebase.firestore();
      ref = db.collection("maps").doc($page.params.id);
    }
  })();
</script>

{#if firebase && ref}
  <Paths bind:ref />
{/if}
