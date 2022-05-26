<script>
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  ;
  let mapCreated = false;
  let ready = false;

  function getMapData() {
    let mapData = {
      image:
        "https://firebasestorage.googleapis.com/v0/b/expwis.appspot.com/o/map1.png?alt=media&token=12e1ee07-a782-40c1-addc-e2179fc89d95",
      title: "Map1",
      authorId: $session.user.uid,
      locations: [
        {
          accessLocations: ["1cjn3"],
          goals: [],
          id: "z0ub6",
          isStartLocation: true,
          markerPositionX: "400",
          markerPositionY: "400",
          name: "Start",
          textPositionX: "400",
          textPositionY: "450",
        },
        {
          id: "1cjn3",
          accessLocations: [],
          goals: [],
          isStartLocation: false,
          markerPositionX: "500",
          markerPositionY: "650",
          name: "Location 2",
          textPositionX: "500",
          textPositionY: "700",
        },
      ],
      paths: [
        {
          endLocation: "1cjn3",
          endLocationIndex: 1,
          endLocationName: "Location1",
          // Be carefull with X and Y it should be stored as [y, x]!
          points: '[["400","400"],["650", "500"]]',
          startLocation: "z0ub6",
          startLocationName: "Start",
        },
      ],
    };
    return mapData;
  }

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
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
          await db.collection("maps").doc($page.params.mapId).set(getMapData());
          ready = true;
        } catch (e) {
          console.log(e);
        }
      }
    }
  })();
</script>

Creating a new map <br />

{#if ready}
<div data-test="complete">
  Map successfully created!</div>
{/if}
