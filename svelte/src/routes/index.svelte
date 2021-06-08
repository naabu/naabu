<script>
  import ActivityChoiceList from "$lib/ActivityChoice/list.svelte";
  import { getStores, session } from "$app/stores";
  import {collection, doc, getDoc} from "firebase/firestore";
	import { onMount } from 'svelte';
  import { getFirebaseFirestore } from "$lib/firebase";

  let path = null;
  let timeout = null;
  let timeoutCount = 0;

  async function getPathFromUser() {
    timeoutCount = timeoutCount + 1;
    if ($session.user) {
      let uid = $session.user.uid;
      let db = await getFirebaseFirestore($session.environment);
      let ref = doc(db, 'path', uid);
      let snap = await getDoc(ref);
      if (snap.exists()) {
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
    await getPathFromUser();
  });

  $: {
    if ($session.user && path === null) {
      timeoutCount = 0;
      timeout = setInterval(getPathFromUser, 500);
    }
  }

</script>


<svelte:head>
	<title>Kies je pad</title>
</svelte:head>

<section>
  {#if $session.user && path !== null}
    <ActivityChoiceList bind:activities={path.activities} /> 
  {/if}
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
