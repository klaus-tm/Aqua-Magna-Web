import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

/**
 * elements necessary for the firebase usage in the app
 */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);