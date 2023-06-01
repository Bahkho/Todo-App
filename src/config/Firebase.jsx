// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR1L3MuZ-A2EFZr0zElvXug9hCA2lOwBg",
  authDomain: "to-do-app-31511.firebaseapp.com",
  projectId: "to-do-app-31511",
  storageBucket: "to-do-app-31511.appspot.com",
  messagingSenderId: "86115394167",
  appId: "1:86115394167:web:fa535cc54342fbbc941c72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
