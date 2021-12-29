<!-- Create a map -->
<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;
  let mapCreated = false;
  let ready = false;

  async function getMapData(db) {
    let snapshot = await db.collection("maps").doc("map1").get();
    if (snapshot.exists) {
      return snapshot.data();
    }
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        ($session.environment === "cypress" ||
        $session.environment === "test"||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous &&
        !mapCreated
      ) {
        mapCreated = true;
        let db = await firebase.firestore();
        try {
          let module = await getMapData(db);
          if (module) {
            module.moduleDescription = "test";
            module.moduleName = "Test";
            module.moduleSvg = "";
            (module.modifiedAt = firebase.firestore.Timestamp.now().seconds),
              (module.authorId = $session.user.uid);
            module.locations[0].goals = [
              {
                id: "cypress-test-goal-1",
                title: "Cypress Test Goal 1",
              },
            ];
            module.locations[1].goals = [
              {
                id: "cypress-test-goal-2",
                title: "Cypress Test Goal 2",
              },
            ];
            module.mapId = "map1";
            await db.collection("modules").doc("module1").set(module);
            ready = true;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  })();
</script>

Creating a module <br />

{#if ready}
  <div data-test="complete">Module successfully created!</div>
{/if}
