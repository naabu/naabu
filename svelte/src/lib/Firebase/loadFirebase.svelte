<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const firebaseConfig = {
    apiKey: $session.fbApiKey,
    authDomain: "expwis.firebaseapp.com",
    projectId: "expwis",
    storageBucket: "expwis.appspot.com",
    messagingSenderId: "950890412912",
    appId: "1:950890412912:web:a248488bf4e6eb2bc3adb5",
    measurementId: "G-8ZT9LCY8BY",
  };

  initFirebase().then((fb) => {
    console.log('here')
    $firebaseStore = fb;
    dispatch("firebaseInitialized", {
      firebase: fb,
    });
  });

  async function initFirebase() {
    let fb = null;
    if (typeof window !== "undefined") {
      fb = (await import("firebase/app")).default;
      await import("firebase/auth");
      await import("firebase/firestore");
      if (fb.apps.length == 0) {
        fb.initializeApp(firebaseConfig);
      }
    } else if ($session.environment === "development") {
      fb = await import("firebase");
      await import("firebase/auth");
      await import("firebase/firestore");
      if (!fb.apps || fb.apps.length == 0) {
        fb.initializeApp(firebaseConfig);
      }
    } else {
      const firebase = require("firebase");
      fb = (await import("firebase/app")).default;
      await import("firebase/auth");
      await import("firebase/firestore");
      if (!fb.apps || fb.apps.length == 0) {
        fb.initializeApp(firebaseConfig);
      }
    }

    if ($session.environment === "development") {
      if (!fb.auth().emulatorConfig) {
        await fb.auth().useEmulator("http://localhost:5010");
      }
      if (fb.firestore()._delegate._settings.host !== "localhost:5012") {
        fb.firestore().settings({ experimentalAutoDetectLongPolling: true });
        await fb.firestore().useEmulator("localhost", 5012);
      }
    }
    if ($session.environment === "cypress") {
      if (!fb.auth().emulatorConfig) {
        await fb.auth().useEmulator("http://firebase:5010");
      }
      if (fb.firestore()._delegate._settings.host !== "firebase:5012") {
        fb.firestore().settings({ experimentalAutoDetectLongPolling: true });
        await fb.firestore().useEmulator("firebase", 5012);
      }
    }

    return fb;
  }
</script>
