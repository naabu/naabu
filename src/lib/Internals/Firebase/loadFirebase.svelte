<script>
  import { page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { createEventDispatcher } from "svelte";
  import { firebaseConfig } from "$lib/Internals/Firebase/config";
  const dispatch = createEventDispatcher();

  initFirebase().then((fb) => {
    $firebase = fb;
    dispatch("firebaseInitialized", {
      $firebase: fb,
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
    } else if ($page.data.session.environment== "development") {
      fb = await import("firebase");
      await import("firebase/auth");
      await import("firebase/firestore");
      if (!fb.apps || fb.apps.length == 0) {
        fb.initializeApp(firebaseConfig);
      }
    } else {
      const$firebase = require("firebase");
      fb = (await import("firebase/app")).default;
      await import("firebase/auth");
      await import("firebase/firestore");
      if (!fb.apps || fb.apps.length == 0) {
        fb.initializeApp(firebaseConfig);
      }
    }

    if ($page.data.session.environment === "development") {
      if (!fb.auth().emulatorConfig) {
        await fb.auth().useEmulator("http://localhost:5010");
      }
      if (fb.firestore()._delegate._settings.host !== "localhost:5012") {
        fb.firestore().settings({ experimentalAutoDetectLongPolling: true });
        await fb.firestore().useEmulator("localhost", 5012);
      }
    }

    if ($page.data.session.environment === "jenkins" || $page.data.session.environment === "test") {
      if (!fb.auth().emulatorConfig) {
        await fb
          .auth()
          .useEmulator("http://firebase:5010", { disableWarnings: true });
      }
      if (fb.firestore()._delegate._settings.host !== "firebase:5012") {
        fb.firestore().settings({ experimentalAutoDetectLongPolling: true });
        await fb.firestore().useEmulator("firebase", 5012);
      }
    }
    return fb;
  }
</script>
