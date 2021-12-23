<!-- Create a map -->
<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;
  let mapCreated = false;

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
          markerPositionX: "200",
          markerPositionY: "200",
          name: "Start",
          textPositionX: "100",
          textPositionY: "100",
        },
        {
          id: "1cjn3",
          accessLocations: [],
          goals: [],
          isStartLocation: false,
          markerPositionX: "300",
          markerPositionY: "300",
          name: "Location 1",
          textPositionX: "400",
          textPositionY: "400",
        },
      ],
      paths: [
        {
          endLocation: "1cjn3",
          endLocationIndex: 1,
          endLocationName: "Location1",
          points: '[["200","200"],["300","300"]]',
          startLocation: "z0ub6",
          startLocationName: "Start",
        },
      ],
    };
    return mapData;
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        ($session.environment === "cypress" ||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous &&
        !mapCreated
      ) {
        console.log("only once?");
        mapCreated = true;
        let db = await firebase.firestore();

        try {
          await db.collection("maps").doc("map1").set(getMapData());
        } catch (e) {
          console.log(e);
        }
      }
    }
  })();
</script>

Hello world!
