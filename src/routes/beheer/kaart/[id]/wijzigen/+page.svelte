<script>
  import Edit from "$lib/Module/Map/Components/edit.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";

 
  let ref;

  $: (async () => {
    if ($firebase) {
     
      const db = await $firebase.firestore();
      ref = db.collection("maps").doc($page.params.id);
    }
  })();
</script>

{#if $firebase && ref}
  <Edit bind:ref  />
{/if}
