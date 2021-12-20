<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;
  let resetDone = false;
  let mounted = false;
  let db;
  let feedbackstring = "<br> feedback: <br>";

  async function cleanModules() {
    try {
      if ($session.user.uid) {
        let modulesCollection = db
          .collection("modules")
          .where("authorId", "==", $session.user.uid);
        let querySnapshot = await modulesCollection.get();
        querySnapshot.forEach((doc) => async () => {
          feedbackstring = feedbackstring + "deleting module " + doc.id + "<br>";
          await doc.ref.delete();
        });
      }
    } catch (error) {
      console.error(error);
    }
    resetDone = true;
  }

  // $: (async () => {
  //   if (
  //     mounted &&
  //     ($session.environment === "cypress" ||
  //       $session.environment === "development") &&
  //     $session.user &&
  //     !deleted
  //   ) {
  //     deleted = true;
  //     // await removeCurriculumFeatures();
  //   }
  // })();

  $: (async () => {
    if (
      ($session.environment === "cypress" ||
        $session.environment === "development") &&
      db &&
      $session.player &&
      $session.user &&
      !$session.user.isAnonymous
    ) {
      await cleanModules();
    }
  })();

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      db = await firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "development"}
  Now cleaning up the modules.
  {@html feedbackstring}

  {#if resetDone}
    <div>Modules cleaned</div>
  {/if}
{/if}
