// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZNza1ZLfJwzF4yL9sLQ1l-crE6fL1hHg",
  authDomain: "omr-scanner-6690b.firebaseapp.com",
  projectId: "omr-scanner-6690b",
  storageBucket: "omr-scanner-6690b.appspot.com",
  messagingSenderId: "359791323508",
  appId: "1:359791323508:web:fcd22ba393308059efa421",
  measurementId: "G-TQ6GR8P62F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);