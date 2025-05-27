import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABtsLEuiHBBP6LIfg8Zdzi_cZCe-wortI",
    authDomain: "lido-chat-project.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
