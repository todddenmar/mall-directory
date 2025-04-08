import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDruVpQooIsyL3ch9xqHE09D8RmoEpdrKw",
  authDomain: "robinsons-pagadian.firebaseapp.com",
  projectId: "robinsons-pagadian",
  storageBucket: "robinsons-pagadian.firebasestorage.app",
  messagingSenderId: "440327282759",
  appId: "1:440327282759:web:ad6cc6c8588b11c0981162",
  measurementId: "G-ZT9PYHPXQS"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db, storage, auth };
