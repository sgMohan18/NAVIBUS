import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9F8lRsoGw7e_GEUf8jRF7BwjH41H88v0",
  authDomain: "navi-bus-7d6bb.firebaseapp.com",
  projectId: "navi-bus-7d6bb",
  storageBucket: "navi-bus-7d6bb.appspot.com",
  messagingSenderId: "1083785954102",
  appId: "1:1083785954102:web:299f1db4010c2b7ea9a997",
  measurementId: "G-Q4E12WQR0C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;