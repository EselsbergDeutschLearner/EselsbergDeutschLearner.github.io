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

// Function to add content to Firestore
async function addContent(section, content) {
    try {
        await addDoc(collection(db, section), {
            content: content,
            timestamp: new Date()
        });
        console.log('Content added successfully!');
    } catch (error) {
        console.error('Error adding content: ', error);
    }
}

// Function to load content from Firestore
function loadContent(sectionId) {
    const section = document.getElementById(sectionId);
    const q = query(collection(db, sectionId), orderBy('timestamp'));
    onSnapshot(q, (snapshot) => {
        section.innerHTML = `<h2>${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}</h2>`;
        snapshot.forEach((doc) => {
            const content = document.createElement('article');
            content.textContent = doc.data().content;
            section.appendChild(content);
        });
    });
}

// Load content for each section
['vocabulary', 'grammar', 'exercises', 'resources', 'blog'].forEach((sectionId) => {
    loadContent(sectionId);
});

// Admin form submission
const adminForm = document.getElementById('adminForm');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const section = adminForm['section'].value;
    const content = adminForm['content'].value;
    addContent(section, content);
    adminForm.reset();
});

// Add security headers using JavaScript
document.addEventListener('DOMContentLoaded', () => {
    let metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = "Content-Security-Policy";
    metaCSP.content = "default-src 'self'; script-src 'self' https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js;";
    document.head.appendChild(metaCSP);

    let metaXCTO = document.createElement('meta');
    metaXCTO.httpEquiv = "X-Content-Type-Options";
    metaXCTO.content = "nosniff";
    document.head.appendChild(metaXCTO);
});

// Authentication functionality
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
