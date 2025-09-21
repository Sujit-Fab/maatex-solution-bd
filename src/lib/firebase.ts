import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: REPLACE THIS WITH YOUR CLIENT'S FIREBASE CONFIGURATION
// You can find this in your Firebase project settings.
const firebaseConfig = {
  // The configuration for your web app's Firebase project.
  apiKey: "API_KEY_PLACEHOLDER", // This will be populated automatically
  authDomain: "threadmark-fabrics.firebaseapp.com",
  projectId: "threadmark-fabrics",
  storageBucket: "threadmark-fabrics.appspot.com",
  messagingSenderId: "760486195000",
  appId: "1:760486195000:web:7b4392c5e97e3e9d929bcd"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };