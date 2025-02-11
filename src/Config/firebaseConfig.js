// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB711OKBuBxmcbNlWY4qzuAnYFBwlliFak",
  authDomain: "gemini-clone-f6702.firebaseapp.com",
  projectId: "gemini-clone-f6702",
  storageBucket: "gemini-clone-f6702.firebasestorage.app",
  messagingSenderId: "954595813045",
  appId: "1:954595813045:web:07a0bee4814676693b80fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);