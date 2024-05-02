import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDMQfpOyP4p0btddT7_Vkg-uSvzle3PHYM",
  authDomain: "aquamagna-77b9d.firebaseapp.com",
  databaseURL: "https://aquamagna-77b9d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aquamagna-77b9d",
  storageBucket: "aquamagna-77b9d.appspot.com",
  messagingSenderId: "264908388565",
  appId: "1:264908388565:web:e5e8f574e4f6489c8f4a5c",
  measurementId: "G-X99ZW8CEFY"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);