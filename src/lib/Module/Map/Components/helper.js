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

export async function getUserMap(firebase, mapId, map, player) {
  let db = await firebase.firestore();
  let userMap = null;
  if (player && map) {
    let userMapRef = db
      .collection("maps/" + mapId + "/players")
      .doc(player.id);
    const userMapSnap = await userMapRef.get();
    if (userMapSnap.exists) {
      userMap = userMapSnap.data();
    }
    else {
      let startLocations = [];
      for (let i = 0; i < map.locations.length; i++) {
        if (map.locations[i].isStartLocation) {
          startLocations.push(map.locations[i].id);
        }
      }

      let userMapData = {
        unlockedLocations: startLocations,
        succeededLocations: [],
        selectedAdventures: [],
      }
      let mapCollectionRef = db.collection("maps/" + mapId + "/players")
      let result = await mapCollectionRef.doc(player.id).set(userMapData);
      userMap = userMapData;
    }
  }
  return userMap;
}

export function getMapSaveData(map, formatPoints = true) {
  let saveLocations = [];
  for (let i = 0; i < map.locations.length; i++) {
    let newLocation = {
      id: map.locations[i].id,
      isStartLocation: map.locations[i].isStartLocation,
      accessLocations: map.locations[i].accessLocations,
      name: map.locations[i].name,
      textPositionX: map.locations[i].textPositionX,
      textPositionY: map.locations[i].textPositionY,
      markerPositionX: map.locations[i].markerPositionX,
      markerPositionY: map.locations[i].markerPositionY,
    };
    let saveGoals = [];
    for (let i2 = 0; i2 < map.locations[i].goals.length; i2++) {
      let goalData = {
        title: map.locations[i].goals[i2].title,
      };
      if (map.locations[i].goals[i2].objectID) {
        goalData.id = map.locations[i].goals[i2].objectID;
      } else {
        goalData.id = map.locations[i].goals[i2].id;
      }
      saveGoals.push(goalData);
    }
    newLocation.goals = saveGoals;
    saveLocations.push(newLocation);
  }

  let savedPath = [];
  for (let i = 0; i < map.paths.length; i++) {
    let newPath = {};
    newPath.startLocation = map.paths[i].startLocation;
    newPath.endLocation = map.paths[i].endLocation;
    if (formatPoints) {
      newPath.points = JSON.stringify(map.paths[i].points);
    }
    else {
      newPath.points = map.paths[i].points;
    }
    newPath.startLocationName = map.paths[i].startLocationName;
    newPath.endLocationName = map.paths[i].endLocationName;
    newPath.endLocationIndex = map.paths[i].endLocationIndex;
    savedPath.push(newPath);
  }

  const data = {
    title: map.title,
    image: map.image,
    locations: saveLocations,
    paths: savedPath,
  };
  return data;
}

export async function updateActivities(firebase, map) {
  let db = await firebase.firestore();
  for (let i = 0; i < map.locations.length; i++) {
    for (let i2 = 0; i2 < map.locations[i].goals.length; i2++) {
      let goalId;
      if (map.locations[i].goals[i2].objectID) {
        goalId = map.locations[i].goals[i2].objectID;
      } else {
        goalId = map.locations[i].goals[i2].id;
      }

      let query = db.collection("activities").where('goalIds', "array-contains", goalId);
      query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (!data.maps) {
            data.maps = [];
          }
          if (!data.maps.includes(map.id)) {
            data.maps.push(map.id);
          }
          let docRef = doc.ref;
          docRef.set(data);
        });
      });

    }
  }
}

function getPath(map, startLocation, endLocation) {
  for (let i = 0; i < map.paths.length; i++) {
    if (map.paths[i].startLocation === startLocation && map.paths[i].endLocation === endLocation) {
      return map.paths[i];
    }
  }
  return false;
}

export function generatePathsForMap(map) {
  let newPaths = [];
  for (let i = 0; i < map.locations.length; i++) {
    let location = map.locations[i];
    let startPointX = location.markerPositionX;
    let startPointY = location.markerPositionY;
    for (let i2 = 0; i2 < location.accessLocations.length; i2++) {
      for (let i3 = 0; i3 < map.locations.length; i3++) {
        if (map.locations[i3].id === location.accessLocations[i2]) {
          let endPointX = map.locations[i3].markerPositionX;
          let endPointY = map.locations[i3].markerPositionY;

          // Check if there is an existing path for these locations.
          let pointsArray = [[startPointY, startPointX], [endPointY, endPointX]];
          let path = getPath(map, location.id, map.locations[i3].id);
          if (path) {
            path.points[0] = [startPointY, startPointX];
            path.points[path.points.length - 1] = [endPointY, endPointX]
            pointsArray = path.points;
          }
          newPaths.push({ startLocation: location.id, startLocationName: location.name, endLocation: map.locations[i3].id, endLocationName: map.locations[i3].name, endLocationIndex: i3, points: pointsArray });
        }
      }
    }
  }
  map.paths = newPaths;
}
