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
      console.log("Trying to delete the player!");
      await playerMapRef.delete();
      console.log("Player map deleted");
      playerMapDeleted = true;
    } catch (error) {
      console.error(error);
    }
  }

  $: {
    console.log("Reactive");
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
    console.log("mounted");
  });
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Great success! Now deleting the user map!
  {#if playerMapDeleted}
    Player map is deleted!
  {/if}
{/if}
