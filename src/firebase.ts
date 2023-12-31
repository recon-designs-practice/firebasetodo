import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHDGAlELZbugeSQdi74DxifUH3TBoaRQI",
  authDomain: "fir-todo-53bcc.firebaseapp.com",
  projectId: "fir-todo-53bcc",
  storageBucket: "fir-todo-53bcc.appspot.com",
  messagingSenderId: "834006579379",
  appId: "1:834006579379:web:3792a7c8d4bd0f412ed8c6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestoreDb = getFirestore(app)

export {
  auth,
  firestoreDb
};
