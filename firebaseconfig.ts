import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_KEY,
  authDomain: process.env.NEXT_PUBLIC_DOM,
  projectId: process.env.NEXT_PUBLIC_PROJID,
  storageBucket: process.env.NEXT_PUBLIC_STORBUCK,
  messagingSenderId: process.env.NEXT_PUBLIC_MESID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const firebasedb = getFirestore(app);

export const FireBase_AUTH = initializeAuth(app, {

});
export const SignUp_AUTH = getAuth(app)

