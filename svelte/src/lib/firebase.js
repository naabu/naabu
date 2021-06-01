import { getApp, initializeApp } from "firebase/app"
import { getFirestore, useFirestoreEmulator } from "firebase/firestore"
import { getAuth, useAuthEmulator} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTQTwe21wwYm2TsMBwH8m1lSHWMEK4KmQ",
  authDomain: "expwis.firebaseapp.com",
  projectId: "expwis",
  storageBucket: "expwis.appspot.com",
  messagingSenderId: "950890412912",
  appId: "1:950890412912:web:a248488bf4e6eb2bc3adb5",
  measurementId: "G-8ZT9LCY8BY"
};
  
export async function getFirebaseApp() {
  try { 
    return await getApp();
  }
  catch (error) {
    return await initializeApp(firebaseConfig);
  }
}

export async function getFirebaseAuth(environment = "production") {
  const firebaseApp = await getFirebaseApp();
  const auth =  await getAuth(firebaseApp);
  if (environment === 'development' && !auth.emulatorConfig){
    await useAuthEmulator(auth, "http://localhost:5010");
  }
  return auth;
}

export async function getFirebaseFirestore(environment = "production") {
  const firebaseApp = await getFirebaseApp();
  const firestore =  await getFirestore(firebaseApp);
  if (environment === 'development' && firestore._settings.host !== "localhost:5012"){
    await useFirestoreEmulator(firestore, "localhost", 5012);
  }
  return firestore;
}