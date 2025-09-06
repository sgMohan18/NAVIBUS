// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9F8lRsoGw7e_GEUf8jRF7BwjH41H88v0",
    authDomain: "navi-bus-7d6bb.firebaseapp.com",
    projectId: "navi-bus-7d6bb",
    storageBucket: "navi-bus-7d6bb.firebasestorage.app",
    messagingSenderId: "1083785954102",
    appId: "1:1083785954102:web:299f1db4010c2b7ea9a997",
    measurementId: "G-Q4E12WQR0C"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);//
const db = getFirestore(app); // Firestore
const auth = getAuth(app); // Authentication

// Export db and auth for use in other parts of your app
export { db, auth };
