import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9qJ97esOIty5Jh4ad9JHZJFwDww0OAJk",
  authDomain: "b1berufgerman-fda4c.firebaseapp.com",
  projectId: "b1berufgerman-fda4c",
  storageBucket: "b1berufgerman-fda4c.firebasestorage.app",
  messagingSenderId: "1064039262468",
  appId: "1:1064039262468:web:caeaf1255d6a897940c851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target['email'].value;
    const password = e.target['password'].value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user);
        })
        .catch((error) => {
            console.error('Login error:', error.message);
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('adminSection').style.display = 'block';
        document.getElementById('loginSection').style.display = 'none';
    } else {
        document.getElementById('adminSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    }
});
