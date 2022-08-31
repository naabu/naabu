<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user, player } from "$lib/Internals/User/store";
  
  let playerMapDeleted = false;
  let mounted = false;
  let db;

  async function removePlayerMap() {
    let playerMapRef = db
      .collection("maps")
      .doc($player.currentMapId)
      .collection("players")
      .doc($player.id);
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
      ($page.data.session.environment === "cypress" ||
      $page.data.session.environment === "test" ||
        $page.data.session.environment === "development") &&
      $player
    ) {
      removePlayerMap();
    }
  }

  $: (async () => {
    if ($firebase) {
     
      db = await $firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $page.data.session.environment === "cypress" || $page.data.session.environment === "test" || $page.data.session.environment === "development"}
  Now deleting the user map!
  {#if playerMapDeleted}
    <div data-test="complete">Player map is deleted!</div>
  {/if}
{/if}
