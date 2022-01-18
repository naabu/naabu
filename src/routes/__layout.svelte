<script>
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { onMount, getContext } from "svelte";
  import Header from "$lib/Internals/Header/index.svelte";
  import "$lib/../app.css";
  import LoadFirebase from "$lib/Internals/Firebase/loadFirebase.svelte";
  import { loginUser } from "$lib/Internals/User/helper";

  let user = null;
  let player = null;
  let firebase;

  function handleLoginEvent(event) {
    firebase = $firebaseStore;
    if (firebase) {
      let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
      $session.serverFirestoreTimeStamp = serverTimestamp;
      firebase.auth().onAuthStateChanged(async (newUser) => {
        let userPlayer = await loginUser(firebase, newUser);
        $session.user = userPlayer.user;
        $session.player = userPlayer.player;
        if (userPlayer.player && userPlayer.player.currentMapId) {
          $session.defaultMapId = userPlayer.player.currentMapId;
        }
      });
    }
  }
</script>

<LoadFirebase on:firebaseInitialized={handleLoginEvent} />

<Header />

<main class="mx-auto mb-5 py-6 px-4 sm:p-6 lg:pb-8 max-w-7xl">
  <section />
  <slot />
</main>
