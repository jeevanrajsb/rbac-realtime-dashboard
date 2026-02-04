import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // ✅ REQUIRED
};

const app = initializeApp(firebaseConfig);
console.log("MODE:", import.meta.env.MODE);
console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("AUTH DOMAIN:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("PROJECT ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

