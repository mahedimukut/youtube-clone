// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAdDkDCIJINVc6v7QRn8p8V5fc8_ar0cg4",
    authDomain: "video-8d23f.firebaseapp.com",
    projectId: "video-8d23f",
    storageBucket: "video-8d23f.appspot.com",
    messagingSenderId: "583931753556",
    appId: "1:583931753556:web:63d11a9bef5893f3eb69c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;