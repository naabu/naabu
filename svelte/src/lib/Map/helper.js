export async function getMap(firebase, mapId) {
  let db = await firebase.firestore();
  let ref = db.collection("maps").doc(mapId);
  let snap = await ref.get();
  let map = null;
  if (snap.exists) {
    map = snap.data();
    map.id = ref.id;
  }
  return map;
}

export async function getUserMap(firebase, mapId, player) {
  console.log(mapId);
  console.log(player);
  let db = await firebase.firestore();
  let userMap = null;
  if (player) {
    let userMapRef = db
      .collection("maps/" + mapId + "/players")
      .doc(player.id);
    const userMapSnap = await userMapRef.get();
    if (userMapSnap.exists) {
      userMap = userMapSnap.data();
    }
    else {
      let startLocations = [];
      for (let i = 0 ; i < map.locations.length; i++) {
        if (map.locations[i].isStartLocation) {
          startLocations.push(map.locations[i].id);
        }
      }

      let userMapData = {
        unlockedLocations: startLocations,
        succeededLocations: [],
        selectedActivities: [],
      }
      let mapCollectionRef = db.collection("maps/" + mapId + "/players")
      let result = await mapCollectionRef.doc(player.id).set(userMapData);
      userMap = userMapData;
    }
  }
  return userMap;
}
