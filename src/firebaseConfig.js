import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJb-w7ETEAxo8pJtUjrl7gJBbTzsJpFXs",
  authDomain: "blog-e0aef.firebaseapp.com",
  projectId: "blog-e0aef",
  storageBucket: "blog-e0aef.appspot.com",
  messagingSenderId: "303649990201",
  appId: "1:303649990201:web:41c6a034b6e6b146338fe8",
  measurementId: "G-91SZYPBP8P"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);