<!-- Create a map -->
<script>
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";
  
  let moduleCreated = false;
  let ready = false;

  async function getMapData(db) {
    let snapshot = await db.collection("maps").doc($page.params.mapId).get();
    if (snapshot.exists) {
      return snapshot.data();
    }
  }

  $: (async () => {
    if ($firebase) {
     
      if (
        ($page.data.session.environment === "cypress" ||
        $page.data.session.environment === "test"||
          $page.data.session.environment === "development") &&
        $user &&
        !$user.isAnonymous &&
        !moduleCreated
      ) {
        moduleCreated = true;
        let db = await $firebase.firestore();
        try {
          let module = await getMapData(db);
          if (module) {
            module.moduleDescription = "Test module 1 description";
            module.moduleName = "Test module 1 title";
            module.moduleSvg = "";
            (module.modifiedAt =$firebase.firestore.Timestamp.now().seconds),
              (module.authorId = $user.uid);
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
            await db.collection("modules").doc($page.params.moduleId).set(module);
            ready = true;
          }
          else {
            console.error("map not found to create module for!");
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
