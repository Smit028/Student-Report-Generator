// firebase.js or firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZNza1ZLfJwzF4yL9sLQ1l-crE6fL1hHg",
  authDomain: "omr-scanner-6690b.firebaseapp.com",
  databaseURL: "https://omr-scanner-6690b-default-rtdb.firebaseio.com",
  projectId: "omr-scanner-6690b",
  storageBucket: "omr-scanner-6690b.appspot.com",
  messagingSenderId: "359791323508",
  appId: "1:359791323508:web:fcd22ba393308059efa421",
  measurementId: "G-TQ6GR8P62F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Get a reference to the database

console.log(db); // Check if the database object is correctly initialized

export default db;
