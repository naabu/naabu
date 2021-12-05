<!-- <script context="module" >
  import { initFirebase } from "$lib/firebase";

  export async function load({session}) {
    let firebase = await initFirebase(session.environment);
    return {
      props: {
        firebase: firebase
      },
    };
  }
</script> -->
<script>
  import Edit from "$lib/Activity/edit.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";

  // import firebase from "firebase/app";
  let firebase;

  let ref;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      const db = await firebase.firestore();
      ref = db.collection("activities").doc($page.params.id);
    }
  })();
</script>

{#if firebase && ref}
  <Edit bind:ref />
{/if}
