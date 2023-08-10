import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
// firebase config data
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)