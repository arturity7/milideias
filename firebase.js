// firebase.js (módulo)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqrzUF3cSK_nIfsNBlswZBRtiZLEmCfNw",
  authDomain: "trainify01-f9c84.firebaseapp.com",
  projectId: "trainify01-f9c84",
  storageBucket: "trainify01-f9c84.firebasestorage.app",
  messagingSenderId: "31187309099",
  appId: "1:31187309099:web:8366892e2d20217778d06e",
  measurementId: "G-4GP9DMY12J"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
