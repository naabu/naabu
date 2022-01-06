<script>
  import { getStores, session, page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
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
      $session.environment === "test" ||
        $session.environment === "development") &&
      $session.player
    ) {
      removePlayerMap();
    }
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      db = await firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "test" || $session.environment === "development"}
  Now deleting the user map!
  {#if playerMapDeleted}
    <div data-test="complete">Player map is deleted!</div>
  {/if}
{/if}
