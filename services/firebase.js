// Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Enums
import FirebaseConfig from "~/enums/FirebaseConfig.js";

const firebaseConfig = {
    apiKey: FirebaseConfig.API_KEY,
    authDomain: FirebaseConfig.AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
