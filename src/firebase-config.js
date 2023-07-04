// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /**
   *  Refer the README . 
   * 
   *  Put your own Firebase service credentials here below:
   */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // Not needed

export const provider = new GoogleAuthProvider();
