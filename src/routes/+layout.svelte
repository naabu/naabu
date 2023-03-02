<script>
  import { page } from '$app/stores';
  import { firebase, auth } from "$lib/Internals/Firebase/store";
  import { user, player } from "$lib/Internals/User/store";
  import Header from "$lib/Internals/Header/index.svelte";
  import "../app.css";
  import LoadFirebase from "$lib/Internals/Firebase/loadFirebase.svelte";
  import { onAuthStateChanged } from "firebase/auth";
  import { loginUser } from "$lib/Internals/User/helper";
  import { init } from "svelte-intl-precompile";

  let config = {
    fallbackLocale: "en",
  };

  // if ($page.data.session.defaultLanguage) {
  //   config.initialLocale = $page.data.session.defaultLanguage;
  // }
  // init(config);

  function handleLoginEvent(event) {
    if ($auth) {
      onAuthStateChanged(async (auth, newUser) => {
        console.log('Check for user status')
        let userPlayer = await loginUser($firebase, newUser);
        $user = userPlayer.user;
        $player = userPlayer.player;
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
