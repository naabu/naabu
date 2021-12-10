
export function hasSpecialClaims(user) {
  if (user && user.uid && (
    user.idTokenResult.claims.canDebugDevelopment ||
    user.idTokenResult.claims.canModerate)) {
    return true;
  }
  return false;
}

export async function getPlayer(firebase, user) {
  let player;
  let db = await firebase.firestore();
  let ref = db.collection("players").doc(user.uid);
  let snap = await ref.get();
  if (snap.exists) {
    player = snap.data();
  } else {
    const data = {
      // currentMapId: $session.defaultMapId,
    };
    try {
      let collectionRef = db.collection("players");
      let result = await collectionRef.doc(user.uid).set(data);
      player = data;
    } catch (e) {
      console.log(e);
    }
  }
  if (player !== null) {
    player.id = user.uid;
  }
  return player;
}

export async function loginUser(firebase, newUser) {
  let user;
  let player;
  if (newUser) {
    user = newUser;
    user.idTokenResult = await user.getIdTokenResult();
    player = await getPlayer(firebase, user);
  } else {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {})
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    user = null;
    player = null;
  }
  return {user: user, player: player};
}

