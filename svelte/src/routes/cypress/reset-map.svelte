<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  let firebase;
  let playerMapDeleted = false;
  let mounted = false;
  let db;

  async function removePlayerMap() {
    let playerMapRef = db
      .collection("maps")
      .doc($session.player.currentMapId)
      .collection("players")
      .doc($session.player.id);
    try {
      await playerMapRef.delete();
      playerMapDeleted = true;
    } catch (error) {
      console.error(error);
    }
  }

  $: {
    if (
      mounted &&
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      $session.player
    ) {
      removePlayerMap();
    }
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
    mounted = true;
  });
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Now deleting the user map!
  {#if playerMapDeleted}
    <div>Player map is deleted!</div>
  {/if}
{/if}
