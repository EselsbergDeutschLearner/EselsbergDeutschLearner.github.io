import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAa1KGsbrctzrxDXBLR-OIV4blRIQkytk",
  authDomain: "b1berufgerman.firebaseapp.com",
  projectId: "b1berufgerman",
  storageBucket: "b1berufgerman.firebasestorage.app",
  messagingSenderId: "49248433061",
  appId: "1:49248433061:web:3366b7c72a40994c212e4c"
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
