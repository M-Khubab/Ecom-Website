import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNRta5umyBXxs5TkSLKU4yPR2zaIcFHgc",
  authDomain: "swapify-4c1f7.firebaseapp.com",
  projectId: "swapify-4c1f7",
  storageBucket: "swapify-4c1f7.appspot.com",
  messagingSenderId: "1051692989445",
  appId: "1:1051692989445:web:95f3f8f75fdcbbd116b06c",
  measurementId: "G-J76B6R7TSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);