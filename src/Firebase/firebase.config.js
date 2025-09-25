// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx68FfUiI9P0Wg3dJo5wq4mCp7M4tqYZQ",
  authDomain: "modern-hotel-bookinfg.firebaseapp.com",
  projectId: "modern-hotel-bookinfg",
  storageBucket: "modern-hotel-bookinfg.firebasestorage.app",
  messagingSenderId: "204702968979",
  appId: "1:204702968979:web:f4abd2725af96120fbb166"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);
export const auth = getAuth(app)