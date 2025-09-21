import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpsJnApoYD3EPDF5JL76FYmmY4XrbZy5A",
  authDomain: "threadmark-fabrics.firebaseapp.com",
  projectId: "threadmark-fabrics",
  storageBucket: "threadmark-fabrics.appspot.com",
  messagingSenderId: "760486195000",
  appId: "1:760486195000:web:6948a6146da67f75929bcd"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
