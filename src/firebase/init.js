// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";  
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApgYJtTnp2EtRDyzSPWR3suLr3anOB65E",
  authDomain: "yiren-library.firebaseapp.com",
  projectId: "yiren-library",
  storageBucket: "yiren-library.firebasestorage.app",
  messagingSenderId: "203666570252",
  appId: "1:203666570252:web:1153589d803e4a39e88229"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;

