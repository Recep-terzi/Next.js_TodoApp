import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAYzbQCSTkEkWXz8kQDn3NcT4dH-FkxxbY",
    authDomain: "modernblogapp.firebaseapp.com",
    projectId: "modernblogapp",
    storageBucket: "modernblogapp.appspot.com",
    messagingSenderId: "663325496718",
    appId: "1:663325496718:web:927857cb76c4cac08e80df"
  };
initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider();
export {db,auth,provider}