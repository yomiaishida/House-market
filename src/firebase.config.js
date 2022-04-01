import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATJLA-RblEddRzAmqYanesJpi5e6saKE4",
  authDomain: "house-market-20b99.firebaseapp.com",
  projectId: "house-market-20b99",
  storageBucket: "house-market-20b99.appspot.com",
  messagingSenderId: "416086648617",
  appId: "1:416086648617:web:e3df27e801e19fdcfbf938",
  measurementId: "G-0QCFTNH6CG",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFireStore;
