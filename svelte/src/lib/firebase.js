import { getApp, initializeApp } from "firebase/app"
import { getAuth, useAuthEmulator  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTQTwe21wwYm2TsMBwH8m1lSHWMEK4KmQ",
    authDomain: "expwis.firebaseapp.com",
    projectId: "expwis",
    storageBucket: "expwis.appspot.com",
    messagingSenderId: "950890412912",
    appId: "1:950890412912:web:a248488bf4e6eb2bc3adb5",
    measurementId: "G-8ZT9LCY8BY"
  };
  
function getOrCreateFirebaseApp() {
    try {
        return getApp();
    }
    catch (error) {
        return initializeApp(firebaseConfig);
    }
}
export const firebaseApp = getOrCreateFirebaseApp();

export function getFirebaseAuth(environment = "development") {
    console.log('here');
    const auth =  getAuth(firebaseApp);
    if (environment === 'development'){
        useAuthEmulator(auth, "http://localhost:5010");
    }
    return auth;
}