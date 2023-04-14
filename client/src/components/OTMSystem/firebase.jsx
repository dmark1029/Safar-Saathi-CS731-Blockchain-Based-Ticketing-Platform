// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA0XOcK2b1sibawz-3t-1w1Na77WOFfQhc",
  authDomain: "cs731a.firebaseapp.com",
  projectId: "cs731a",
  storageBucket: "cs731a.appspot.com",
  messagingSenderId: "418966369757",
  appId: "1:418966369757:web:e8861cda34ddc6cf2bf234",
  measurementId: "G-F8ZM00WWDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);