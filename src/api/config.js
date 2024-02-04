import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCCzGGWfJs94OLYEIkX1rYGCxI8VS99Jog',
	authDomain: 'tcl-72-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-72-smart-shopping-list',
	storageBucket: 'tcl-72-smart-shopping-list.appspot.com',
	messagingSenderId: '292388089759',
	appId: '1:292388089759:web:59fa749489020ee7ed17aa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
