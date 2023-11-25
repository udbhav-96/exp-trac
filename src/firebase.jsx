// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyAxW9cxPQ9aj8w0rY5Oc88b2e7xaxcEaYo",

  authDomain: "chatgpt-et.firebaseapp.com",

  projectId: "chatgpt-et",

  storageBucket: "chatgpt-et.appspot.com",

  messagingSenderId: "596406547100",

  appId: "1:596406547100:web:96b4b8f8b17e8cc1ecf359"


};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
export default app;
