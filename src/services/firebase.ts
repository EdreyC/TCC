// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = initializeApp( {
  apiKey: "AIzaSyCU7O-CXv-vuzxXYBJBO4147aK5Uq-cotg",
  authDomain: "agilizeit-ff6de.firebaseapp.com",
  projectId: "agilizeit-ff6de",
  storageBucket: "agilizeit-ff6de.appspot.com",
  messagingSenderId: "1078371033969",
  appId: "1:1078371033969:web:bbd2db16753db520c5ccd0"
});

const auth = getAuth()
const db = getDatabase(firebaseConfig);

export {auth,db}