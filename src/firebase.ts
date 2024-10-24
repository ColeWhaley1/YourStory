import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8h4zntXkCXM8zX1GImxk4mMZfsY9r0oU",
  authDomain: "yourstory-c360a.firebaseapp.com",
  projectId: "yourstory-c360a",
  storageBucket: "yourstory-c360a.appspot.com",
  messagingSenderId: "609026790600",
  appId: "1:609026790600:web:7bf7e24496e92dcb9bc1fd",
  measurementId: "G-C97SJ9JPKR"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db: Firestore = getFirestore(app);