// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMwJjjlitihGvvDBQRMyVHuBMOIFHDNy0",
  authDomain: "produktif-app.firebaseapp.com",
  projectId: "produktif-app",
  storageBucket: "produktif-app.firebasestorage.app",
  messagingSenderId: "646693517324",
  appId: "1:646693517324:web:8e2d8a381c0fe23c925629",
  measurementId: "G-GWDPXPQ15F"
};

// init app
const app = initializeApp(firebaseConfig);

// db FIRESTORE
export const db = getFirestore(app);

export const analytics = getAnalytics(app);

//auth
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);