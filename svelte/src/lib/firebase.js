const firebaseConfig = {
  apiKey: "AIzaSyDTQTwe21wwYm2TsMBwH8m1lSHWMEK4KmQ",
  authDomain: "expwis.firebaseapp.com",
  projectId: "expwis",
  storageBucket: "expwis.appspot.com",
  messagingSenderId: "950890412912",
  appId: "1:950890412912:web:a248488bf4e6eb2bc3adb5",
  measurementId: "G-8ZT9LCY8BY"
};

export async function initFirebase(environment = "production", proFb) {
  let fb = null;
  if (typeof window !== "undefined") {
    fb = (await import("firebase/app")).default;
    await import("firebase/auth");
    await import("firebase/firestore");
    if (fb.apps.length == 0) {
      fb.initializeApp(firebaseConfig);
    }
  }
  else if (environment === 'development') {
    fb = await import("firebase");
    await import("firebase/auth");
    await import("firebase/firestore");
    // await import("firebase/auth");
    // await import("firebase/firestore");
    // fb = await import("firebase");
    if (!fb.apps || fb.apps.length == 0) {
      fb.initializeApp(firebaseConfig);
    }
  }
  else {
    fb = proFb;
    const firebase = require('firebase');
    fb = (await import("firebase/app")).default;
    await import("firebase/auth");
    await import("firebase/firestore");
    // if (!firebase.apps || firebase.apps.length == 0) {
    //   firebase.initializeApp(firebaseConfig);
    // }
    // fb = require('firebase');
    // await import("firebase/firestore");
    // fb = await import("firebase");
    if (!fb.apps || fb.apps.length == 0) {
      fb.initializeApp(firebaseConfig);
    }
  }

  if (environment === 'development') {
    if (!fb.auth().emulatorConfig) {
      await fb.auth().useEmulator("http://localhost:5010");
    }
    if (fb.firestore()._delegate._settings.host !== "localhost:5012") {
      fb.firestore().settings({ experimentalAutoDetectLongPolling: true })
      await fb.firestore().useEmulator("localhost", 5012);
    }
  }
  if (environment === 'cypress') {
    if (!fb.auth().emulatorConfig) {
      await fb.auth().useEmulator("http://firebase:5010");
    }
    if (fb.firestore()._delegate._settings.host !== "firebase:5012") {
      fb.firestore().settings({ experimentalAutoDetectLongPolling: true })
      await fb.firestore().useEmulator("firebase", 5012);
    }
  }

  return fb;
}
