// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfr4syx1dxVYTT5blm-l2EhKmeNeFrSFM",
  authDomain: "audify-1094b.firebaseapp.com",
  projectId: "audify-1094b",
  storageBucket: "audify-1094b.appspot.com",
  messagingSenderId: "542578621929",
  appId: "1:542578621929:web:b4bd81185bca2a02d25f78",
  storageBucket: "gs://audify-1094b.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();