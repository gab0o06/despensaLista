import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYugwotcD3PzGI8rIKvjuEM6-viswuZ9A",
  authDomain: "despensalista.firebaseapp.com",
  projectId: "despensalista",
  storageBucket: "despensalista.firebasestorage.app",
  messagingSenderId: "263278506464",
  appId: "1:263278506464:web:46ad0e5dfafb6c40f6bb85",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
