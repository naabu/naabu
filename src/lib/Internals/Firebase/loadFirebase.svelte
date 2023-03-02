<script>
  import { page } from "$app/stores";
  import { firebase, auth } from "$lib/Internals/Firebase/store";
  import { createEventDispatcher } from "svelte";
  import { 
    PUBLIC_FIREBASE_API_KEY,
    PUBLIC_FIREBASE_AUTH_DOMAIN,
    PUBLIC_FIREBASE_PROJECT_ID,
    PUBLIC_FIREBASE_STORAGE_BUCKET,
    PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    PUBLIC_FIREBASE_APP_ID,
    PUBLIC_FIREBASE_MEASUREMENT_ID,
  } from '$env/static/public';
  import { initializeApp } from 'firebase/app';
  import { getAuth } from "firebase/auth";

  const dispatch = createEventDispatcher();
  console.log(PUBLIC_FIREBASE_API_KEY)
  const firebaseConfig = {
    apiKey: PUBLIC_FIREBASE_API_KEY,
    authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: PUBLIC_FIREBASE_APP_ID,
    measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
  };
  initFirebase()

  export async function initFirebase() {
    console.log("init firebase")
    let fb = null;
    if (typeof window !== "undefined") {
      console.log("client")
      console.log(firebaseConfig)
      $firebase = initializeApp(firebaseConfig);
      $auth = getAuth($firebase);
    }
    else {
      console.log("SSR firebase admin")
    }
    //   fb = (await import("firebase/app")).default;
    //   await import("firebase/auth");
    //   await import("firebase/firestore");
    //   if (fb.apps.length == 0) {
    //     fb.initializeApp(firebaseConfig);
    //   }
    // } else if ($page.data.session.environment== "development") {
    //   fb = await import("firebase");
    //   await import("firebase/auth");
    //   await import("firebase/firestore");
    //   if (!fb.apps || fb.apps.length == 0) {
    //     fb.initializeApp(firebaseConfig);
    //   }
    // } else {
    //   const$firebase = require("firebase");
    //   fb = (await import("firebase/app")).default;
    //   await import("firebase/auth");
    //   await import("firebase/firestore");
    //   if (!fb.apps || fb.apps.length == 0) {
    //     fb.initializeApp(firebaseConfig);
    //   }
    // }

    // if ($page.data.session.environment === "development") {
    //   if (!fb.auth().emulatorConfig) {
    //     await fb.auth().useEmulator("http://localhost:5010");
    //   }
    //   if (fb.firestore()._delegate._settings.host !== "localhost:5012") {
    //     fb.firestore().settings({ experimentalAutoDetectLongPolling: true });
    //     await fb.firestore().useEmulator("localhost", 5012);
    //   }
    // }

    // if ($page.data.session.environment === "jenkins" || $page.data.session.environment === "test") {
    //   if (!fb.auth().emulatorConfig) {
    //     await fb
    //       .auth()
    //       .useEmulator("http://firebase:5010", { disableWarnings: true });
    //   }
    //   if (fb.firestore()._delegate._settings.host !== "firebase:5012") {
    //     fb.firestore().settings({ experimentalAutoDetectLongPolling: true });
    //     await fb.firestore().useEmulator("firebase", 5012);
    //   }
    // }
    dispatch("firebaseInitialized")
  }
</script>
