import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwH7pvC_Ct88_ar4UXCZJ_WbHmxVj5YTY",
    authDomain: "twitter-login-demo-3014e.firebaseapp.com",
    projectId: "twitter-login-demo-3014e",
    storageBucket: "twitter-login-demo-3014e.firebasestorage.app",
    messagingSenderId: "832490235404",
    appId: "1:832490235404:web:0ec15e94c84f0801b57029",
    measurementId: "G-Y6HWMFE366"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new TwitterAuthProvider();

export { auth, provider, signInWithPopup };
