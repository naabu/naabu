import { getApp, initializeApp } from "firebase/app"
import { getFirestore, useFirestoreEmulator } from "firebase/firestore"
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

export async function getFirebaseAuth(environment = "production") {
    const auth =  await getAuth(firebaseApp);
    console.log(auth);
    if (environment === 'development' && !auth.emulatorConfig){
        await useAuthEmulator(auth, "http://localhost:5010");
    }
    return auth;
}

export async function getFirebaseFirestore(environment = "production") {
    const firestore =  await getFirestore(firebaseApp);
    console.log('here6');
    console.log(firestore._settings.host);
    if (environment === 'development' && firestore._settings.host !== "localhost:5012"){
        console.log('here7');
        await useFirestoreEmulator(firestore, "localhost", 5012);
    }
    console.log('here8');
    return firestore;
}