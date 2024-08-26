// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmXwxXC4gVrDGDLA3crM1ke0UCSNc3OyM",
  authDomain: "blog-website-1374d.firebaseapp.com",
  projectId: "blog-website-1374d",
  storageBucket: "blog-website-1374d.appspot.com",
  messagingSenderId: "282866688806",
  appId: "1:282866688806:web:f0145d659b9a83bfc5d7e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {fireDb,auth,storage}