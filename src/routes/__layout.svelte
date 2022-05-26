<script context="module">
  import { addMessages, init } from 'svelte-intl-precompile';
  import en from '$locales/en.js';
  import nl from '$locales/nl.js';
  addMessages('en', en);
  addMessages('nl', nl);

</script>

<script>
  import { getStores, session } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import Header from "$lib/Internals/Header/index.svelte";
  import "../app.css";
  import LoadFirebase from "$lib/Internals/Firebase/loadFirebase.svelte";
  import { loginUser } from "$lib/Internals/User/helper";
 

  let config = {
    fallbackLocale: 'en',
  }

  if ($session.defaultLanguage) {
    config.initialLocale = $session.defaultLanguage;
  }

  init(config);

  function handleLoginEvent(event) {
   $firebase = $firebase;
    if (firebase) {
      let serverTimestamp =$firebase.firestore.Timestamp.now().seconds;
      $session.serverFirestoreTimeStamp = serverTimestamp;
     $firebase.auth().onAuthStateChanged(async (newUser) => {
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
