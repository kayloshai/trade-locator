// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQmvtKebPux-xqc1MrxVLXVutC3x9M5M0",
  authDomain: "msp-trade-locator.firebaseapp.com",
  projectId: "msp-trade-locator",
  storageBucket: "msp-trade-locator.firebasestorage.app",
  messagingSenderId: "1097476622606",
  appId: "1:1097476622606:web:a4434ba33f5cdb2cd72f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);