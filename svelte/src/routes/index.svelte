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
  import ActivityChoiceList from "$lib/ActivityChoice/list.svelte";
  import { getStores, session } from "$app/stores";
	import { onMount } from 'svelte';
 // import firebase from "firebase/app";
 import { initFirebase } from "$lib/firebase";
 import { goto } from '$app/navigation';

  let firebase;

  let path = null;
  let timeout = null;
  let timeoutCount = 0;

  async function getPathFromUser() {
    timeoutCount = timeoutCount + 1;
    if ($session.user) {
      let uid = $session.user.uid;
      let db = await firebase.firestore();
      let ref = db.collection('path').doc(uid);
      let snap = await ref.get(ref);
      if (snap.exists) {
        path = snap.data();
        if (timeout !== null) {
          clearTimeout(timeout);
          timeout = null;
        }
      }
    }
    if (timeoutCount >= 15) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);

    await getPathFromUser();
  });

  $: if ($session.player) {
    goto("/kaart/" + $session.player.currentMapId);
  }

</script>


<svelte:head>
	<title>Kies je pad</title>
</svelte:head>

<section>
  <!-- {#if $session.user && path !== null}
    <ActivityChoiceList bind:activities={path.activities} /> 
  {/if} -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
